import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Task Management App</h1>
      <p>Stay organized and manage your tasks efficiently.</p>
      <div className="button-group">
        <Link to="/login" className="btn login-btn">
          Login
        </Link>
        <Link to="/signup" className="btn signup-btn">
          Sign Up!
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
