import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match!");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign up');
      setShowError(true);
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>Email: </label>
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Confirm Password:</label>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {showSuccess && <div className="success-popup">User successfully registered, wait you will be redirected to login...</div>}
      {showError && <div className="error-popup">{errorMessage}</div>}
      <p>
        Already a user? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
