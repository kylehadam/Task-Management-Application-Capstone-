import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './Task.css'; // Import the updated styles

interface Task {
  _id: string;
  title: string;
  description: string;
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
      fetchTasks(); // Refresh the task list after deletion
    } catch {
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleFormSubmitSuccess = () => {
    fetchTasks(); // Refresh tasks after submission
    setSelectedTask(null); // Clear the selected task
  };

  return (
    <div className="task-page-container">
      <div className="task-list-container">
        <h2>Ongoing Tasks</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TaskList
          tasks={tasks}
          onEdit={setSelectedTask}
          onDelete={handleDelete}
        />
      </div>
      <div className="task-form-container">
        <TaskForm
          task={selectedTask}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      </div>
    </div>
  );
};

export default Tasks;
