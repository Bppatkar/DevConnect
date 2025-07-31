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

// GET /api/projects - Get all projects
// POST /api/projects - Create a new project
router.route('/').get(getAllProjects).post(auth, createProject);

// GET /api/projects/search - Search projects by query parameter 'q'
router.route('/search').get(searchProjects);

// GET /api/projects/:id - Get single project
// PUT /api/projects/:id - Update project
// DELETE /api/projects/:id - Delete project
router
  .route('/:id')
  .get(getProject)
  .put(auth, updateProject)
  .delete(auth, deleteProject);

// POST /api/projects/:id/comments - Add a comment to a project
router.route('/:id/comments').post(auth, addComment);

// POST /api/projects/:id/like - Toggle like on a project
router.route('/:id/like').post(auth, toggleLike);

export default router;
