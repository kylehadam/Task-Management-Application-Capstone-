import { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css';

interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  completed: boolean;
  dueDate?: string;
}

interface TaskFormProps {
  task?: Task | null;
  onSubmitSuccess: () => void;
}

const TaskForm = ({ task, onSubmitSuccess }: TaskFormProps) => {
  const [formData, setFormData] = useState<Task>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    category: task?.category || 'General',
    completed: task?.completed || false,
    dueDate: task?.dueDate || '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        completed: task.completed,
        dueDate: task.dueDate || '',
      });
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    try {
      const token = localStorage.getItem('token');
      if (task?._id) {
        await axios.put(`/api/tasks/${task._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'General',
        completed: false,
        dueDate: '',
      });
      setError(null);
      onSubmitSuccess();
    } catch {
      setError('Failed to submit task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{task ? 'Edit Task' : 'Add New Task'}</h3>
      {error && <p className="error-text">{error}</p>}
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Description of Task:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Priority:</label>
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.completed}
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          />
          Completed
        </label>
      </div>
      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>
      <button type="submit" className="submit-button">
        {task ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
