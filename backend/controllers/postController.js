
import mongoose from "mongoose";
import Post from "../models/Post.js";


export const createPost = async(req, res) => {
  try {
    const {content, author} = req.body;
    await Post.create({
      content,
      author
    });
    res.status(201).json({message: 'Post created sucessfully'})
  } catch (err) {
    res.status(400).json({message: err.message || err});
  }
}

export const getPosts = async(req, res) =>{
  try {
    const query = Post.find();
    const data = await query;
    res.status(201).json({data})
  } catch (err) {
    res.status(400).json({message: err.message || err})
  }
}

export const getPost = async (req, res) => {
  const {id} = req.params;
  try {
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({message: 'Invalid Id'})
    const data = await Post.findById(id);
  if(!data) return res.status(400).json({message: 'Data not found'})
    return res.status(201).json({data})
  } catch (err) {
    res.status(400).json({message: err.message || message})
  }
}

export const updatePost = async (req, res) => {
  const {id} = req.params;
  try {
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({message: 'Invalid Id'});
    const isExist = await Post.findById(id);
    if(!isExist){
      res.status(400).json({message: 'Data not found'});
    }

    isExist.content = req.body?.content || isExist.content;
    isExist.author = req.body?.author  || isExist.author;

    await isExist.save();

    res.status(201).json({message: 'Updated sucessfully'})
    
  } catch (err) {
    res.status(400).json({message: err.message || message})
  }
}

export const removePost = async(req, res) => {
  const {id} = req.params;
  try {
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({message: 'Invalid Id'});
    const isExist = await Post.findById(id);
    if(!isExist){
      res.status(400).json({message: 'Data not found'})
    }
    await isExist.deleteOne();
    res.status(201).json({message: 'Deleted sucessfully'})
  } catch (err) {
    res.status(400).json({message: err.message || message})
  }
}