import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Tasks from './components/Tasks/Tasks';
import Dashboard from './components/Dashboard/Dashboard'; 

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Task Management App</h1>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link> {/* Add link for Dashboard */}
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Add route for Dashboard */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
