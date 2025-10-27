
import mongoose from "mongoose";
import Post from "../models/Post.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { upload } from "../middlewares/multer.js";


export const createPost = async (req, res) => {
  let uploadedImage = null;
  try {
    const { content } = req.body;
    const author = req.userId;
    let postData = { content, author };

    if (req.file) {
      uploadedImage = await upload("posts").uploadToCloudinary(req.file.buffer, req.file.originalname);

      postData.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id
      };
    }

    const post = new Post(postData);
    await post.save();
    res.status(201).json({ message: 'Post created successfully' })
  } catch (err) {
    if (uploadedImage?.public_id) await cloudinary.uploader.destroy(uploadedImage.public_id);
    res.status(400).json({ message: err.message || err });
  }
}

export const getPosts = async (req, res) => {
  try {
    const { mine, authorId } = req.query;

    let filter = {};

    //If ?mine=true → show logged-in user's posts
    if (mine === "true" && req.userId) {
      filter.author = mongoose.Types.ObjectId.createFromHexString(req.userId);
    }
    //Else if ?authorId=... → show posts by that author
    else if (authorId) {
      if (!mongoose.isValidObjectId(authorId)) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
      filter.author = mongoose.Types.ObjectId.createFromHexString(authorId);
    }

    // Aggregate posts with like/comment counts
    const posts = await Post.aggregate([
      { $match: filter },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
          commentsCount: { $size: { $ifNull: ["$comments", []] } },
          liked: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId.createFromHexString(req.userId), "$likes"] },
              then: true,
              else: false,
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          content: 1,
          author: 1,
          image: 1,
          likesCount: 1,
          commentsCount: 1,
          liked: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    // Populate author info
    const populatedPosts = await Post.populate(posts, {
      path: "author",
      select: "username profilePicture",
    });

    const totalPosts = await Post.countDocuments(filter);

    // const query = Post.find(filter, "-likes -comments")
    //   .populate("author", "username profilePicture")
    //   // .populate("comments.author", "username")
    //   .sort({ createdAt: -1 });
    // const results = await query;
    res.status(200).json({
      totalPosts,
      results: populatedPosts,
    })
  } catch (err) {
    res.status(400).json({ message: err.message || err })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' })
    const result = await Post.findById(id, "-likes -comments").populate("author", "username profilePicture")
      .sort({ createdAt: -1 });;
    if (!result) return res.status(404).json({ message: 'Data not found' })
    return res.status(200).json({ result })
  } catch (err) {
    res.status(400).json({ message: err?.message })
  }
}

export const updatePost = async (req, res) => {
  let uploadedImage = null;
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Data not found' });
    }

    if (req.userId !== post.author.toString()) {
      return res.status(403).json({ message: "Forbidden: you can only update your own post" })
    }

    let oldImage = null;

    if (req.file) {
      uploadedImage = await upload("posts").uploadToCloudinary(req.file.buffer, req.file.originalname);

      oldImage = post.image?.public_id;

      post.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id
      };
    }

    post.content = req.body?.content ?? post.content;

    await post.save();
    if (req.file && oldImage) {
      await cloudinary.uploader.destroy(oldImage);
    }

    res.status(200).json({ message: 'Updated sucessfully' })

  } catch (err) {
    if (uploadedImage?.public_id) await cloudinary.uploader.destroy(uploadedImage.public_id);
    res.status(500).json({ message: err?.message })
  }
}

export const removePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Data not found' })
    }
    if (req.userId !== post.author.toString()) {
      return res.status(403).json({ message: "Forbidden: you can only delete your own post" })
    }
    if (post.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(post.image?.public_id);
      } catch (cloudErr) {
        console.error('Cloudinary deletion error:', cloudErr);
        return res.status(500).json({ message: 'Failed to delete image from storage' });
      }

    }
    await post.deleteOne();
    res.status(200).json({ message: 'Deleted sucessfully' })
  } catch (err) {
    res.status(400).json({ message: err?.message })
  }
}