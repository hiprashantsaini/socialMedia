import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './userform.css'; // Import the custom CSS file

const UserForm = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('handle', handle);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.post('http://localhost:8080/api/user/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials:true,
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store all selected files in state
  };

  return (
    <div className="form-container">
      <h2 className="form-title">User Submission Form</h2>
      <h3><Link to={'/'}>AdminDashboard</Link></h3>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Social Media Handle Input */}
        <div className="form-group">
          <label htmlFor="handle">Social Media Handle:</label>
          <input
            type="text"
            id="handle"
            className="form-input"
            placeholder="Enter your social media handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            className="form-input"
            multiple
            onChange={handleImageChange}
            required
          />
          {/* Display names of selected files */}
          {images.length > 0 && (
            <div className="selected-files">
              <h4>Selected Files:</h4>
              <ul>
                {images.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
