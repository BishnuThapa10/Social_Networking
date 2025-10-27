

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
      text: {
        type: String,
        required: true,
        trim: true,
      },
      author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    }, {timestamps: true})

const postSchema = new mongoose.Schema({

  content: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  image: {
    url: {
      type: String,
      default: null
    },
    public_id: {
      type: String,
      default: null
    }
  },

  likes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ] ,

  comments: [commentSchema],

}, {timestamps: true});

postSchema.index({ createdAt: -1 });

const Post = mongoose.model('Post', postSchema);
export default Post;