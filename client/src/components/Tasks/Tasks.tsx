import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './Task.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  completed: boolean;
  dueDate?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.tasks);
      setError(null);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  // Fetch tasks on initial render
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle task deletion
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      setError('Failed to delete task.');
    }
  };

  // Handle task completion toggle
  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/tasks/${id}`,
        { completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      setError('Failed to update task completion.');
    }
  };

  // Callback for successful form submission
  const handleFormSubmitSuccess = () => {
    fetchTasks();
    setSelectedTask(null);
  };

  return (
    <div className="task-page-container">
      {/* Display any errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Task Form */}
      <div className="task-form-container">
        <TaskForm task={selectedTask} onSubmitSuccess={handleFormSubmitSuccess} />
      </div>

      {/* Task List */}
      <div className="task-list-container">
        <h2>Ongoing Tasks</h2>
        <TaskList
          tasks={tasks}
          onEdit={setSelectedTask}
          onDelete={handleDelete}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default Tasks;
