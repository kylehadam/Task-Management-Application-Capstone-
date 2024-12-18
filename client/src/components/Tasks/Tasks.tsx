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
  const [isModalOpen, setIsModalOpen] = useState(false); // Control Modal visibility

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
    setIsModalOpen(false); // Close modal on success
  };

  const openModal = (task?: Task) => {
    setSelectedTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="task-page-container">
      {/* Display Errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Button to Add New Task */}
      <button className="add-task-button" onClick={() => openModal()}>
        Add New Task
      </button>

      {/* Task List */}
      <div className="task-list-container">
        <h2 className="task-list-title">Ongoing Tasks</h2>
        <TaskList
          tasks={tasks}
          onEdit={openModal}
          onDelete={handleDelete}
          onToggleComplete={toggleComplete}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <TaskForm
              task={selectedTask}
              onSubmitSuccess={handleFormSubmitSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
