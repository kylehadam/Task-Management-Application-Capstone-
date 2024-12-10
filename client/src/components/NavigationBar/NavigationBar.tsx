import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css'; // Import external CSS file for styles

interface NavigationBarProps {
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from App
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="navbar">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">Tasks</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
