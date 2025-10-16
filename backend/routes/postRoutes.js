
import express from 'express';
import { createPost, getPost, getPosts, removePost, updatePost } from '../controllers/postController.js';
import { postSchema, validatorJoi } from '../utils/validator.js';
import { upload } from '../utils/multer.js';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { checkUser } from '../middlewares/checkAuth.js';



const router = express.Router();


router.route('/posts').get(getPosts).post(checkUser, upload.any(), validatorJoi.body(postSchema), createPost).all(methodNotAllowed);
router.route('/posts/:id').get(getPost).patch(checkUser, upload.any(), validatorJoi.body(postSchema), updatePost).delete(checkUser, removePost).all(methodNotAllowed);

export default router;