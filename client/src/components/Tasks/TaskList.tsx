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
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;
  