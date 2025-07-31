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

// GET /api/projects (public)
// POST /api/projects (auth required)
router.route('/').get(getAllProjects).post(auth, createProject);

// GET /api/projects/search (public)
router.route('/search').get(searchProjects); 

// GET /api/projects/:id (public)
// PUT /api/projects/:id (auth required, owner only)
// DELETE /api/projects/:id (auth required, owner only)
router
  .route('/:id')
  .get(getProject)
  .put(auth, updateProject)
  .delete(auth, deleteProject);

// POST /api/projects/:id/comments (auth required)
router.route('/:id/comments').post(auth, addComment);

// POST /api/projects/:id/like (auth required)
router.route('/:id/like').post(auth, toggleLike);

export default router;