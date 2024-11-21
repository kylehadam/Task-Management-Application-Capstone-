import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const task = await Task.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const tasks = await Task.find({ user: userId });
  
      res.status(200).json({ tasks }); // Return tasks array within an object
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
