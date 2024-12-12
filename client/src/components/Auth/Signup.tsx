import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface SignupProps {
  onSignupSuccess: () => void;
}

const Signup = ({ onSignupSuccess }: SignupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Popup state
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      console.log('Signup successful:', data); // Debug log
      localStorage.setItem('token', data.token); // Save token for authenticated routes
      setMessage('Signup successful!'); 
      setShowDialog(true); // Show popup dialog
      console.log('Dialog should appear'); // Debug log
      onSignupSuccess(); // Notify App of successful signup
    } catch (err) {
      console.error('Signup failed:', err); // Debug log
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Signup failed.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    console.log('Dialog closed, navigating to tasks'); // Debug log
    setShowDialog(false); // Close dialog
    navigate('/tasks'); // Navigate to tasks page
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <button type="button" className="return-btn" onClick={() => navigate('/')}>
              Return
            </button>
          </div>
        </form>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <p>{message}</p>
            <button onClick={handleDialogClose} className="dialog-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
