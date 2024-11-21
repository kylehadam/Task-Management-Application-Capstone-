import express from 'express';
import { createTask, getAllTasks } from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply the requireAuth middleware to all task routes
router.post('/', requireAuth, createTask);
router.get('/', requireAuth, getAllTasks);

export default router;
