
import { createValidator } from "express-joi-validation";
import Joi from "joi";


export const validatorJoi = createValidator({passError: true})

const commentSchema = Joi.object({
  text: Joi.string().trim().required(),
  author: Joi.string().hex().length(24)
});

export const postSchema = Joi.object({
  content: Joi.string().required().trim(),
  author: Joi.string().hex().length(24),
  image:Joi.object({
    url: Joi.string().uri().allow(null, ''),
    public_id: Joi.string().allow(null, '')
  }).default({url:null, public_id: null}),
  likes: Joi.array().items(Joi.string().hex().length(24)),
  comment: Joi.array().items(commentSchema)
});

export const updatePostSchema = Joi.object({
  content: Joi.string().trim(),
  author: Joi.string().hex().length(24),
  image:Joi.object({
    url: Joi.string().uri().allow(null, ''),
    public_id: Joi.string().allow(null, '')
  }),
  likes: Joi.array().items(Joi.string().hex().length(24)),
  comment: Joi.array().items(commentSchema)
});

export const userSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim().required(),
  password: Joi.string().min(8).max(128).required(),
  // profilePicture: Joi.string().uri().allow(null, ""),
  bio: Joi.string().max(300).allow(""),
  profilePicture:Joi.object({
    url: Joi.string().uri().allow(null, ''),
    public_id: Joi.string().allow(null, '')
  }).default({url:null, public_id: null})
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim(),
  bio: Joi.string().max(300).allow(""),
  profilePicture: Joi.object({
    url: Joi.string().uri().allow(null, ''),
    public_id: Joi.string().allow(null, '')
  })
});

export const loginSchema = Joi.object({
  username: Joi.string().min(5).max(50).trim().required(),
  password: Joi.string().min(8).max(128).required()
})