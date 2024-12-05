import { useState } from 'react';
import axios from 'axios';

interface Task {
  _id?: string;
  title: string;
  description: string;
}

interface TaskFormProps {
  task?: Task | null;
  onSubmitSuccess: () => void;
}

const TaskForm = ({ task, onSubmitSuccess }: TaskFormProps) => {
  const [formData, setFormData] = useState<Task>({
    title: task?.title || '',
    description: task?.description || '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (task?._id) {
        // Update task
        await axios.put(
          `/api/tasks/${task._id}`,
          { ...formData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create task
        await axios.post(
          '/api/tasks',
          { ...formData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setFormData({ title: '', description: '' }); // Reset form
      setError(null);
      onSubmitSuccess(); // Notify parent component
    } catch {
      setError('Failed to submit task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{task ? 'Edit Task' : 'Add New Task'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
