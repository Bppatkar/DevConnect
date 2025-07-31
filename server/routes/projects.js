import express from 'express';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addComment,
  toggleLike,
  searchProjects,
} from '../controllers/project.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProjects).post(auth, createProject);

router.route('/search').get(searchProjects);

router
  .route('/:id')
  .get(getProject)
  .put(auth, updateProject)
  .delete(auth, deleteProject);

router.route('/:id/comments').post(auth, addComment);

router.route('/:id/like').post(auth, toggleLike);
router.route('/:id').patch(auth, updateProject);

export default router;
