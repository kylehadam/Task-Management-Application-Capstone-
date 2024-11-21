import Task from '../models/Task.js';

export const getTaskCompletionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
          pendingTasks: { $sum: { $cond: ['$completed', 0, 1] } },
        },
      },
    ]);

    const result = stats[0] || { completedTasks: 0, pendingTasks: 0 };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task statistics' });
  }
};
