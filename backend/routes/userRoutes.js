
import express from 'express';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { upload } from '../utils/multer.js';
import { loginSchema, userSchema, userUpdateSchema, validatorJoi } from '../utils/validator.js';
import { getProfile, getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { checkUser } from '../middlewares/checkAuth.js';



const router = express.Router();

router.route('/users/login').post(upload.any(), validatorJoi.body(loginSchema), loginUser).all(methodNotAllowed);
router.route('/users/register').post(upload.any(), validatorJoi.body(userSchema), registerUser).all(methodNotAllowed);

router.route('/users/:id').get(checkUser, getUser).patch(checkUser, upload.any(), validatorJoi.body(userUpdateSchema),updateUser).all(methodNotAllowed);

router.route('/me').get(checkUser, getProfile).all(methodNotAllowed);

export default router;