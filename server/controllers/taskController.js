import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      user: userId,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks with filtering, sorting, and pagination
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', search } = req.query;

    const query = { user: userId };
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tasks = await Task.find(query)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate fields
    if (updates.title && updates.title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
