
import express from 'express';
import { createPost, getPost, getPosts, removePost, updatePost } from '../controllers/postController.js';
import { postSchema, validatorJoi } from '../utils/validator.js';
import { upload } from '../utils/multer.js';



const router = express.Router();


router.route('/posts').get(getPosts).post(upload.any(),validatorJoi.body(postSchema), createPost);
router.route('/posts/:id').get(getPost).patch(upload.any(),validatorJoi.body(postSchema),updatePost).delete(removePost);

export default router;