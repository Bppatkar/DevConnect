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

// GET /api/projects
// POST /api/projects
router.route('/').get(getAllProjects).post(auth, createProject);

// GET /api/projects/search/:query
router.route('/search/:query').get(searchProjects);

// GET /api/projects/:id
// PUT /api/projects/:id
// DELETE /api/projects/:id
router
  .route('/:id')
  .get(getProject)
  .put(auth, updateProject)
  .delete(auth, deleteProject);

// POST /api/projects/:id/comments
router.route('/:id/comments').post(auth, addComment);

// POST /api/projects/:id/like
router.route('/:id/like').post(auth, toggleLike);

export default router;
