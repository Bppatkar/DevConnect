import express from 'express';
import { signup, login, getMe } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(auth, getMe);

export default router;