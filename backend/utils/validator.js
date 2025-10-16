
import { createValidator } from "express-joi-validation";
import Joi from "joi";


export const validatorJoi = createValidator({passError: true})

const commentSchmema = Joi.object({
  text: Joi.string().trim().required(),
  author: Joi.string().hex().length(24)
});

export const postSchema = Joi.object({
  content: Joi.string().required().trim(),
  author: Joi.string().hex().length(24),
  likes: Joi.array().items(Joi.string().hex().length(24)),
  comment: Joi.array().items(commentSchmema)
});

export const userSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim().required(),
  password: Joi.string().min(8).max(128).required(),
  profilePicture: Joi.string().uri().allow(null, ""),
  bio: Joi.string().max(300).allow("")
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim().required(),
  profilePicture: Joi.string().uri().allow(null, ""),
  bio: Joi.string().max(300).allow("")
});

export const loginSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim().required(),
  password: Joi.string().min(8).max(128).required()
})