import express from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/stats', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const completedTasks = await Task.countDocuments({ user: userId, completed: true });
    const pendingTasks = await Task.countDocuments({ user: userId, completed: false });

    res.status(200).json({ completedTasks, pendingTasks });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
