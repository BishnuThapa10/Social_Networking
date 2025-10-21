
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    minLength: [5, 'Username must be minimum 5 character long'],
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must be minimum 8 character long']
  },

  profilePicture: {
    url: {
      type: String,
      default: null
    },
    public_id: {
      type: String,
      default: null
    }
  },

  bio: {
    type: String,
    default: "",
    maxLength: 300
  }

}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;