import './TaskList.css'; // Import external CSS file for styles

interface Task {
  _id: string;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="task-list-container">
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div>
              <strong>{task.title}</strong>: {task.description}
            </div>
            <div>
              <button
                className="edit-button"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => onDelete(task._id)}
              >
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
