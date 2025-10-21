
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { upload } from '../middlewares/multer.js';
import cloudinary from '../utils/cloudinaryConfig.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 13);
    await User.create({
      username,
      password: hashPassword
    });

    return res.status(201).json({ message: 'User Register Sucessfully' })
  } catch (err) {
    return res.status(400).json({ message: err?.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExist = await User.findOne({ username });
    if (!isExist) return res.status(404).json({ message: 'User not found' });
    const chechPasss = bcrypt.compareSync(password, isExist.password);
    if (!chechPasss) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: isExist._id }, `${process.env.JWT_SECRET}`);

    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   sameSite: 'none',
    //   secure: true
    // });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err?.message });
  }
}

export const updateUser = async (req, res) => {
  let uploadedImage = null;
  try {
    const userId = req.params.id; //profile id from url

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    if (req.userId !== userId) {
      return res.status(403).json({ message: "Forbidden: not your profile" })
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    let oldImage = null;

    if (req.file) {
      uploadedImage = await upload("profiles").uploadToCloudinary(req.file.buffer, req.file.originalname);

      oldImage = user.profilePicture.public_id;

      user.profilePicture = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id
      };
    }

    user.username = req.body?.username || user.username;
    user.bio = req.body?.bio || user.bio;

    await user.save();
    if (req.file && oldImage) {
      await cloudinary.uploader.destroy(oldImage);
    }
    return res.status(200).json({ message: 'Updated sucessfully' });
  } catch (err) {
    if (uploadedImage?.public_id) await cloudinary.uploader.destroy(uploadedImage.public_id);
    return res.status(400).json({ message: err?.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id; //profile id from url
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const isExist = await User.findById(userId).select('username bio profilePicture -_id');
    if (!isExist) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(isExist)
  } catch (err) {
    return res.status(400).json({ message: err?.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const isExist = await User.findById(req.userId).select('username bio profilePicture');
    if (!isExist) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(isExist)
  } catch (err) {
    return res.status(400).json({ message: err?.message })
  }
}

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username profilePicture")
    .limit(10);

    if (!users) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err?.message })
  }
}
