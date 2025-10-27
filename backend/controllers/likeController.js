import mongoose from "mongoose";
import Post from "../models/Post.js";

export const likeAction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Data not found' });
    }
    if (post.author.toString() === userId) {
      return res.status(400).json({ message: "You can't like your own post." });
    }

    const alreadyLiked = post.likes.includes(userId);

    let updatedPost;
    if (alreadyLiked) {
      // Unlike atomically
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Like atomically (no duplicates)
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }

    res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: updatedPost.likes.length
    });
  } catch (err) {
    res.status(500).json({ message: err?.message })
  }
}