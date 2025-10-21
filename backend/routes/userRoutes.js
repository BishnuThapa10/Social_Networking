
import express from 'express';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { loginSchema, userSchema, userUpdateSchema, validatorJoi } from '../utils/validator.js';
import { getProfile, getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { checkUser } from '../middlewares/checkAuth.js';
import { upload } from '../middlewares/multer.js';



const router = express.Router();

router.route('/users/login').post(upload().multerUpload.none(), validatorJoi.body(loginSchema), loginUser).all(methodNotAllowed);
router.route('/users/register').post(upload().multerUpload.none(), validatorJoi.body(userSchema), registerUser).all(methodNotAllowed);

router.route('/users/:id').get(checkUser, getUser).patch(checkUser, upload("profiles", {width: 300, height: 300, crop: "fill",maxSizeMb: 2}).multerUpload.single("profilePicture"), validatorJoi.body(userUpdateSchema),updateUser).all(methodNotAllowed);

router.route('/me').get(checkUser, getProfile).all(methodNotAllowed);

export default router;