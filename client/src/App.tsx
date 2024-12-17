import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Tasks from './components/Tasks/Tasks';
import Dashboard from './components/Dashboard/Dashboard';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar visible only when user is authenticated */}
        {isAuthenticated && <NavigationBar onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/login"
                  element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
                />
                <Route
                  path="/signup"
                  element={<Signup onSignupSuccess={() => setIsAuthenticated(true)} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              // Protected Routes
              <>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/tasks" replace />} />
              </>
            )}
          </Routes>
        </main>
        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
