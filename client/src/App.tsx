import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Tasks from './components/Tasks/Tasks';
import Dashboard from './components/Dashboard/Dashboard';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer'; 
import LandingPage from './components/LandingPage/LandingPage'; // Import the LandingPage
import './styles/App.css'; // Import global styles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token') // Check if a token exists in localStorage
  );

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <NavigationBar onLogout={handleLogout} />} {/* Show NavBar only when authenticated */}
        <main>
          <Routes>
            {/* Public Routes */}
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<LandingPage />} /> {/* Default Landing Page */}
                <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
                <Route path="/signup" element={<Signup onSignupSuccess={() => setIsAuthenticated(true)} />} />
                <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect to landing page */}
              </>
            ) : (
              // Protected Routes
              <>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/tasks" replace />} /> {/* Redirect to tasks by default */}
              </>
            )}
          </Routes>
        </main>
        <Footer /> {/* Add Footer component */}
      </div>
    </Router>
  );
}

export default App;
