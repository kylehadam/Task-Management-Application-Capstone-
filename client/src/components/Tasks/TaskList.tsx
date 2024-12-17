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
            <strong>{task.title}</strong>
            <p>Description: {task.description}</p>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task._id, e.target.checked)}
              />
              Completed
            </label>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
