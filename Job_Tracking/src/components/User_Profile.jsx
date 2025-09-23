import React, { useState } from 'react';
import axios from 'axios';
import './User_Profile.css';

const User_Profile = () => {
  const [activeTab, setActiveTab] = useState('userdetails');
  const [message, setMessage] = useState('');

  const [personalData, setPersonalData] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    age: '',
    dob: '',
    education: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    skills: ''
  });

  const [qualificationData, setQualificationData] = useState({
    email: '',
    college: '',
    qualification: '',
    experience: '',
    job_type: ''
  });

  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (setter) => (e) => {
    setter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = personalData.skills.split(',').map(s => s.trim()).filter(s => s);
      const payload = { ...personalData, skills: skillsArray, age: Number(personalData.age), pincode: Number(personalData.pincode) };
      const response = await axios.post('http://localhost:8084/users/User_Personal_Details', payload);
      setMessage('User Details saved: ' + response.data);
    } catch (error) {
      setMessage('Saving Details Failed: ' + (error.response?.data || error.message));
    }
  };

  const handleQualificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/users/User_Qualification_Details', qualificationData);
      setMessage('Qualification saved: ' + response.data);
    } catch (error) {
      setMessage('Saving Qualification Failed: ' + (error.response?.data || error.message));
    }
  };

  const handleResumeUploadSubmit = async (e) => {
    e.preventDefault();
    if (!resumeEmail || !resumeFile) {
      setMessage('Please provide your email and select a file.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('email', resumeEmail);
      formData.append('file', resumeFile);
      const response = await axios.post('http://localhost:8084/users/Resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Resume uploaded: ' + response.data);
    } catch (error) {
      setMessage('Resume upload failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container" role="main" aria-label="Job Tracker User Profile Form">
      <h1>Profile</h1>
      <nav className="tabs" role="tablist">
        <div
          role="tab"
          aria-selected={activeTab === 'userdetails'}
          tabIndex={0}
          className={`tab ${activeTab === 'userdetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('userdetails')}
          onKeyPress={(e) => e.key === 'Enter' && setActiveTab('userdetails')}
        >
          Personal Details
        </div>
        <div
          role="tab"
          aria-selected={activeTab === 'qualification'}
          tabIndex={0}
          className={`tab ${activeTab === 'qualification' ? 'active' : ''}`}
          onClick={() => setActiveTab('qualification')}
          onKeyPress={(e) => e.key === 'Enter' && setActiveTab('qualification')}
        >
          Qualification
        </div>
        <div
          role="tab"
          aria-selected={activeTab === 'resume'}
          tabIndex={0}
          className={`tab ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
          onKeyPress={(e) => e.key === 'Enter' && setActiveTab('resume')}
        >
          Resume Upload
        </div>
      </nav>

      {activeTab === 'userdetails' && (
        <form onSubmit={handlePersonalSubmit} aria-label="User Personal Details form">
          <label htmlFor="personal-email">Email</label>
          <input
            id="personal-email"
            type="email"
            name="email"
            value={personalData.email}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-name">Name</label>
          <input
            id="personal-name"
            type="text"
            name="name"
            value={personalData.name}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-phone">Phone</label>
          <input
            id="personal-phone"
            type="tel"
            name="phone"
            value={personalData.phone}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-gender">Gender</label>
          <select
            id="personal-gender"
            name="gender"
            value={personalData.gender}
            onChange={handleChange(setPersonalData)}
            required
          >
            <option value="" disabled>-- Select --</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
          <label htmlFor="personal-age">Age</label>
          <input
            id="personal-age"
            type="number"
            name="age"
            value={personalData.age}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-dob">Date of Birth</label>
          <input
            id="personal-dob"
            type="date"
            name="dob"
            value={personalData.dob}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-education">Education</label>
          <input
            id="personal-education"
            type="text"
            name="education"
            value={personalData.education}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-city">City</label>
          <input
            id="personal-city"
            type="text"
            name="city"
            value={personalData.city}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-district">District</label>
          <input
            id="personal-district"
            type="text"
            name="district"
            value={personalData.district}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-state">State</label>
          <input
            id="personal-state"
            type="text"
            name="state"
            value={personalData.state}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-pincode">Pincode</label>
          <input
            id="personal-pincode"
            type="number"
            name="pincode"
            value={personalData.pincode}
            onChange={handleChange(setPersonalData)}
            required
          />
          <label htmlFor="personal-skills">Skills (comma separated)</label>
          <input
            id="personal-skills"
            type="text"
            name="skills"
            value={personalData.skills}
            onChange={handleChange(setPersonalData)}
            required
          />
          <button type="submit" className='submittion'>Save Personal Details</button>
        </form>
      )}

      {activeTab === 'qualification' && (
        <form onSubmit={handleQualificationSubmit} aria-label="User Qualification Details form">
          <label htmlFor="qual-email">Email</label>
          <input
            id="qual-email"
            type="email"
            name="email"
            value={qualificationData.email}
            onChange={handleChange(setQualificationData)}
            required
          />
          <label htmlFor="qual-college">College</label>
          <input
            id="qual-college"
            type="text"
            name="college"
            value={qualificationData.college}
            onChange={handleChange(setQualificationData)}
            required
          />
          <label htmlFor="qual-qualification">Qualification</label>
          <input
            id="qual-qualification"
            type="text"
            name="qualification"
            value={qualificationData.qualification}
            onChange={handleChange(setQualificationData)}
            required
          />
          <label htmlFor="qual-experience">Experience</label>
          <input
            id="qual-experience"
            type="text"
            name="experience"
            value={qualificationData.experience}
            onChange={handleChange(setQualificationData)}
            required
          />
          <label htmlFor="qual-jobtype">Job Type</label>
          <input
            id="qual-jobtype"
            type="text"
            name="job_type"
            value={qualificationData.job_type}
            onChange={handleChange(setQualificationData)}
            required
          />
          <button type="submit" className='submittion'>Save Qualification Details</button>
        </form>
      )}

      {activeTab === 'resume' && (
        <form onSubmit={handleResumeUploadSubmit} aria-label="Resume Upload form">
          <label htmlFor="resume-email">Email</label>
          <input
            id="resume-email"
            type="email"
            name="resume-email"
            value={resumeEmail}
            onChange={(e) => setResumeEmail(e.target.value)}
            required
          />
          <label htmlFor="resume-file">Select PDF file</label>
          <input
            id="resume-file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            required
          />
          <button type="submit" className='submittion'>Upload Resume</button>
        </form>
      )}

      <div className="message" aria-live="polite">
        {message}
      </div>
    </div>
  );
};

export default User_Profile;
