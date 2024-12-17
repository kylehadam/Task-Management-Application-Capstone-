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

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.tasks);
      setError(null);
    } catch {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/tasks/${id}`,
        { completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch {
      setError('Failed to update task completion.');
    }
  };

  const handleFormSubmitSuccess = () => {
    fetchTasks();
    setSelectedTask(null);
  };

  return (
    <div className="task-page-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="task-form-container">
        <TaskForm
          task={selectedTask}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      </div>
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
