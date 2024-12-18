import Task from '../models/Task.js';

/**
 * Fetch task completion statistics for the authenticated user.
 * @param {Request} req - Express request object with the user's ID.
 * @param {Response} res - Express response object.
 */
export const getTaskCompletionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Aggregate statistics for completed and pending tasks
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

    // Ensure stats exist or provide defaults
    const result = stats[0] || { completedTasks: 0, pendingTasks: 0 };

    res.status(200).json({
      success: true,
      data: result, // Include data explicitly for consistency
    });
  } catch (error) {
    console.error('Error fetching analytics:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task statistics', // Standardized error field
    });
  }
};
