import express from 'express';
import {
  getAllUsers,
  getUser,
  updateProfile,
  searchUsers,
  deleteAccount,
} from '../controllers/user.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/search').get(auth, searchUsers);

router.route('/').get(auth, getAllUsers);

router.route('/:id').get(getUser);

router.route('/me').patch(auth, updateProfile);

router.route('/account').delete(auth, deleteAccount);

export default router;
