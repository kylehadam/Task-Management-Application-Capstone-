import axios from 'axios';

const API_BASE_URL = '/api/tasks';

// Fetch tasks with optional query parameters
export const fetchTasks = async (token: string, queryParams = '') => {
  const { data } = await axios.get(`${API_BASE_URL}${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Ensure tasks have default priority and category if not provided
  return data.tasks.map((task: { title: string; description: string; priority?: string; category?: string }) => ({
    ...task,
    priority: task.priority || 'Medium', // Default priority
    category: task.category || 'General', // Default category
  }));
};

// Create a new task
export const createTask = async (
  token: string,
  task: { title: string; description: string; priority?: string; category?: string }
) => {
  const { data } = await axios.post(
    API_BASE_URL,
    {
      title: task.title,
      description: task.description,
      priority: task.priority || 'Medium', // Default priority
      category: task.category || 'General', // Default category
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

// Update an existing task
export const updateTask = async (
  token: string,
  taskId: string,
  updates: { title?: string; description?: string; priority?: string; category?: string }
) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/${taskId}`,
    {
      ...updates,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

// Delete a task
export const deleteTask = async (token: string, taskId: string) => {
  const { data } = await axios.delete(`${API_BASE_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
