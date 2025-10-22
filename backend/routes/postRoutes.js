
import express from 'express';
import { createPost, getPost, getPosts, removePost, updatePost } from '../controllers/postController.js';
import { postSchema, updatePostSchema, validatorJoi } from '../utils/validator.js';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { checkUser } from '../middlewares/checkAuth.js';
import { upload } from '../middlewares/multer.js';



const router = express.Router();


router.route('/posts').get(checkUser, getPosts)
.post(checkUser,
  upload("posts", {width: 700, height: 350, crop: "fill",maxSizeMb: 5}).multerUpload.single("image"),
  validatorJoi.body(postSchema),
  createPost)
  .all(methodNotAllowed);
router.route('/posts/:id').get(checkUser, getPost)
.patch(checkUser,
  upload("posts", {width: 700, height: 350, crop: "fill",maxSizeMb: 5}).multerUpload.single("image"),
  validatorJoi.body(updatePostSchema),
  updatePost)
  .delete(checkUser, removePost)
  .all(methodNotAllowed);

export default router;