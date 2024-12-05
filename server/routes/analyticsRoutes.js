import express from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { getTaskCompletionStats } from '../controllers/analyticsController.js';

const router = express.Router();

// Analytics endpoint for task statistics
router.get('/stats', requireAuth, getTaskCompletionStats);

export default router;
