import './TaskList.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  completed: boolean;
  dueDate?: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) => {
  return (
    <div className="task-list-container">
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div>
              <strong>Title: {task.title}</strong>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => onToggleComplete(task._id, e.target.checked)}
                />
                Complete
              </label>
            </div>
            <p className="description">
              <strong>Description of Task:</strong> {task.description}
            </p>
            <p className={`priority-${task.priority.toLowerCase()}`}>Priority: {task.priority}</p>
            <p className="category">Category: {task.category}</p>
            {task.dueDate && <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>}
            <div className="task-controls">
              <button className="edit-button" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => onDelete(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
