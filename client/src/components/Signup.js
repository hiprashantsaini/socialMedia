// Signup.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:8080/api/user/signup', formData,{withCredentials:true});
      alert('Signup successful! Please login.');
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || 'Error during signup');
    }finally{
      setFormData({
        name: '',
        email: '',
        password: ''
      })
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <h1>Already have an account?</h1>
      <button><Link to='/login'>Login</Link></button>
    </div>
  );
};

export default Signup;
