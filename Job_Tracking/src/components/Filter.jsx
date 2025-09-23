import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css";
import profileImg from "./profile_photo.webp";

const JobCard = ({ job }) => (
  <div className="job-card">
    {job.urgent && <span className="urgent">🔥 Urgently hiring</span>}
    <h3>{job.job_name}</h3>
    <p className="company">{job.company_name}</p>
    <p>{job.job_type}</p>
    <p className="salary">₹{job.salary.toLocaleString()} monthly</p>
    <div className="tags">
      {job.skills_required
        ? job.skills_required.split(",").map((tag, index) => (
            <span key={index} className="tag">{tag.trim()}</span>
          ))
        : null}
    </div>
  </div>
);

const JobList = ({ minSalary }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8084/api/jobs");
        setJobs(response.data);
      } catch (error) {
        setError("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-list">
      {jobs
        .filter((job) => {
          // salary might be string, convert to number to compare safely
          const salaryNum = Number(job.salary);
          return !isNaN(salaryNum) && salaryNum >= minSalary;
        })
        .map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
    </div>
  );
};

const ProfileCard = () => (
  <div className="profile-card">
    <img src={profileImg} alt="Profile" className="profile-pic" />
    <h3 className="profile-name">John Doe</h3>
    <p className="profile-role">Software Engineer</p>
  </div>
);

const FilterSidebar = ({ minSalary, setMinSalary }) => (
  <div className="filter-sidebar">
    <h3>Filters</h3>
    <div className="filter-category">
      <label>
        <input type="checkbox" /> Work from home
      </label>
      <label>
        <input type="checkbox" /> Full Time
      </label>
      <label>
        <input type="checkbox" /> Part Time
      </label>
    </div>
    <div className="filter-category">
      <h4>Distance</h4>
      <select>
        <option value="">Any</option>
        <option value="5">Within 5 km</option>
        <option value="10">Within 10 km</option>
        <option value="20">Within 20 km</option>
      </select>
    </div>
    <div className="filter-category salary-range">
      <h4>Salary</h4>
      <input
        type="range"
        min="10000"
        max="100000"
        step="5000"
        value={minSalary}
        onChange={(e) => setMinSalary(Number(e.target.value))}
      />
      <div className="salary-display">Minimum Salary: ₹{minSalary.toLocaleString()}</div>
    </div>
    <div className="filter-category">
      <h4>Work Mode</h4>
      <label>
        <input type="checkbox" /> Work from office
      </label>
      <label>
        <input type="checkbox" /> Hybrid
      </label>
    </div>
    <div className="filter-category">
      <h4>Work Shift</h4>
      <label>
        <input type="checkbox" /> Day Shift
      </label>
      <label>
        <input type="checkbox" /> Night Shift
      </label>
      <label>
        <input type="checkbox" /> Flexible Shift
      </label>
    </div>
    <div className="filter-category">
      <h4>Department</h4>
      <select>
        <option value="">Any</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">Human Resources</option>
      </select>
    </div>
  </div>
);

const Header = () => (
  <div className="header">
    <h1 className="header-title">Job Search</h1>
  </div>
);

const Filter = () => {
  const [minSalary, setMinSalary] = useState(10000);

  return (
    <div className="filter-page">
      <Header />
      <div className="filter-content-container">
        <FilterSidebar minSalary={minSalary} setMinSalary={setMinSalary} />
        <JobList minSalary={minSalary} />
        <ProfileCard />
      </div>
    </div>
  );
};

export default Filter;

