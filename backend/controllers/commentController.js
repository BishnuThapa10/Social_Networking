import mongoose from "mongoose";
import Post from "../models/Post.js";


export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const author = req.userId;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' });
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const newComment = {
      text,
      author
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ message: 'Comment added successfully' })
  } catch (err) {
    res.status(500).json({ message: err?.message })
  }
}

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' })
    const post = await Post.findById(id, "comments")
      .populate("comments.author", "username profilePicture");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {

  }
}