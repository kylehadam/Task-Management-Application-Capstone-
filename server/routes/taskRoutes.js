import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, createTask); // Create a new task
router.get('/', requireAuth, getAllTasks); // Fetch tasks with filtering, sorting, and pagination
router.put('/:id', requireAuth, updateTask); // Update a task by ID
router.delete('/:id', requireAuth, deleteTask); // Delete a task by ID

export default router;
