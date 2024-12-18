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
  const renderTasks = (priority: 'High' | 'Medium' | 'Low') => {
    const filteredTasks = tasks.filter((task) => task.priority === priority);

    return (
      <div className={`task-category task-category-${priority.toLowerCase()}`}>
        <h3 className="task-category-title">{priority} Priority</h3>
        <ul className="task-grid">
          {filteredTasks.map((task) => {
            return (
              <li
                key={task._id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <strong>{task.title}</strong>
                <p>Description: {task.description}</p>
                <p>Category: {task.category}</p>
                {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                {task.completed && (
                  <p className="completed-label">Completed</p>
                )}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => onToggleComplete(task._id, e.target.checked)} />
                  &nbsp;&nbsp;&nbsp;Mark as Complete
                </label>

                <div className="task-controls">
                  <button onClick={() => onEdit(task)}>Edit</button>
                  <button onClick={() => onDelete(task._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="task-list-container">
      {renderTasks('High')}
      {renderTasks('Medium')}
      {renderTasks('Low')}
    </div>
  );
};

export default TaskList;
