import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appContext from '../utils/appContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  const {userInfo}=useContext(appContext);

  const navigate=useNavigate();

  // Fetch submissions from the backend API when the component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/submissions');
        setSubmissions(response.data?.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleLogout=async()=>{
    try {
      await axios.get('http://localhost:8080/api/user/logout',{withCredentials:true});
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <h3><Link to='/post'>Add Post</Link>&ensp;<button onClick={handleLogout}>Logout</button></h3>
      {submissions.length === 0 ? (
        <p className="empty-message">No submissions found</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Social Media Handle</th>
              <th>Uploaded Images</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td>{submission.socialMediaHandle}</td>
                <td>
                  <div className="images-container">
                    {submission.images.map((image, idx) => (
                      <a key={idx} href={image.url} target="_blank" rel="noopener noreferrer">
                        <img src={image.url} alt={`upload-${idx}`} className="thumbnail-image" />
                      </a>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
