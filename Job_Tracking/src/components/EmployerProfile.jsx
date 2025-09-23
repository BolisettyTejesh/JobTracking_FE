import React, { useState, useEffect } from 'react';
import './EmployerProfile.css';
import Header_Employer from './Header_Employer'; // Adjust path if needed

export default function EmployerProfile() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    companyName: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      // Optional: If you use authentication and store token/email in localStorage
      const token = localStorage.getItem('jwtToken');
      const email = localStorage.getItem('userEmail');

      if (!email) {
        // If no email stored, skip fetching and set loading false; user can enter details manually
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8084/api/employer-profile/${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          const msg = await response.text();
          throw new Error(msg || 'Failed to fetch profile');
        }

        const data = await response.json();
        setFormData({
          email: data.email || email || '',
          name: data.name || '',
          phone: data.phone || '',
          companyName: data.companyName || '',
        });
      } catch (err) {
        setError(`Error fetching profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8084/api/employer-profile/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if you use token authentication:
          // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to submit profile');
      }

      setSuccess('Employer profile submitted successfully!');
      // Optionally clear the form after submission
      setFormData({ email: '', name: '', phone: '', companyName: '' });
    } catch (error) {
      setError(`Error submitting profile: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <>
        <Header_Employer />
        <div className="employer-container">
          <h2>Loading profile...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header_Employer />
      <div className="employer-container">
        <h2>Employer Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="employer-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
} 
