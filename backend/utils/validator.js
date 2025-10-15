
import { createValidator } from "express-joi-validation";
import Joi from "joi";


export const validatorJoi = createValidator({passError: true})

const commentSchmema = Joi.object({
  text: Joi.string().trim().required(),
  author: Joi.string().hex().length(24)
});

export const postSchema = Joi.object({
  content: Joi.string().required().trim(),
  author: Joi.string().hex().length(24).required(),
  likes: Joi.array().items(Joi.string().hex().length(24)),
  comment: Joi.array().items(commentSchmema)
});