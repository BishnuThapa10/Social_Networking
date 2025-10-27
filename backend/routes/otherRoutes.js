import express from 'express';
import { checkUser } from '../middlewares/checkAuth.js';
import { addComment, getComments } from '../controllers/commentController.js';
import { commentSchema, validatorJoi } from '../utils/validator.js';
import { upload } from '../middlewares/multer.js';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { likeAction } from '../controllers/likeController.js';
import { likeLimiter } from '../middlewares/likeLimiter.js';

const router = express.Router();

router.route('/posts/:id/comments').get(checkUser, getComments)
.post(checkUser,
  upload().multerUpload.none(),
  validatorJoi.body(commentSchema),
  addComment)
  .all(methodNotAllowed);

  router.route('/posts/:id/likes').post(checkUser,likeLimiter,likeAction).all(methodNotAllowed);

export default router;