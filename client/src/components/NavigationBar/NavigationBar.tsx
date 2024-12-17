import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './NavigationBar.css';

interface NavigationBarProps {
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      {/* Hamburger Menu - Always Hidden on Desktop */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-list ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
