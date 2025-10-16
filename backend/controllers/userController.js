
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 13);
    await User.create({
      username,
      password: hashPassword
    });

    return res.status(201).json({message: 'User Register Sucessfully'})
  } catch (err) {
    return res.status(400).json({message: err?.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const isExist = await User.findOne({username});
    if(!isExist) return res.status(404).json({message: 'User not found'});
    const chechPasss = bcrypt.compareSync(password, isExist.password);
    if(!chechPasss) return res.status(400).json({message: 'Invalid credentials'});
    const token = jwt.sign({ id:isExist._id }, 'secret');

    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   sameSite: 'none',
    //   secure: true
    // });

    return res.status(200).json({token});
  } catch (err) {
    return res.status(400).json({message: err?.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; //profile id from url

    if(!mongoose.isValidObjectId(userId)){
      return res.status(400).json({message: 'Invalid Id'});
    }

    if(req.userId !== userId){
      return res.status(403).json({message: "Forbidden: not your profile"})
    }

    const isExist = await User.findById(userId);
    if(!isExist) {
      return res.status(404).json({message: 'User not found'})
    }

    isExist.username = req.body?.username || isExist.username;
    isExist.bio = req.body?.bio || isExist.bio;
    await isExist.save();
    return res.status(200).json({message: 'Updated sucessfully'});
  } catch (err) {
    return res.status(400).json({message: err?.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id; //profile id from url
    if(!mongoose.isValidObjectId(userId)){
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const isExist = await User.findById(userId).select('username bio profilePicture -_id');
    if(!isExist) return res.status(404).json({message: 'User not found'});
    return res.status(200).json(isExist)
  } catch (err) {
    return res.status(400).json({message: err?.message })
  }
}
