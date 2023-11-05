import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthenticated(true);
        navigate('/');
      } else {
        setErrorMessage(data.message);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
      setShowError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div >

    <div className="auth-container">
    <h2>WEATHER APP</h2>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email: </label>
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {showError && <div className="error-popup">{errorMessage}</div>}
      <p>
        Not a user? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
