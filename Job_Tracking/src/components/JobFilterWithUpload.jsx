import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobFilter.css";
import Header_Employer from "./Header_Employer";
const JobCard = ({ job }) => (
  <div className="job-card">
    <h3>{job.job_name}</h3>
    <p><b>Company:</b> {job.company_name}</p>
    <p><b>Job Type:</b> {job.job_type}</p>
    <p><b>Duration:</b> {job.duration}</p>
    <p><b>Last Date to Apply:</b> {job.last_date_to_apply}</p>
    <p><b>Location:</b> {job.location}</p>
    <p><b>Salary:</b> ₹{job.salary}</p>
    <p><b>Stipend:</b> ₹{job.stipend}</p>
    <p><b>Skills Required:</b> {job.skills_required}</p>
    <p><b>Description:</b> {job.description}</p>
  </div>
);

const JobList = ({ refreshFlag }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8084/api/jobs")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
        setError("");
      })
      .catch(err => {
        setError("Failed to fetch jobs: " + err.message);
        setLoading(false);
      });
  }, [refreshFlag]);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div style={{color: "red"}}>{error}</div>;
  if (jobs.length === 0) return <div>No jobs found.</div>;

  return (
    <div>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

const JobFilterWithUpload = ({ onJobAdded }) => {
  const initial = {
    company_name: "",
    description: "",
    duration: "",
    job_name: "",
    job_type: "",
    last_date_to_apply: "",
    location: "",
    salary: "",
    skills_required: "",
    stipend: ""
  };
  const [formData, setFormData] = useState(initial);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setError("");
    setSuccess("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    // basic required fields validation
    if (!formData.job_name || !formData.company_name || !formData.job_type) {
      setError("Job Name, Company Name and Job Type are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    axios.post("http://localhost:8084/api/jobs", formData)
      .then(() => {
        setSuccess("Job added successfully.");
        setFormData(initial);
        onJobAdded();
      })
      // .catch((err) => setError("Failed to add job: " + err.message))
      // .finally(() => setLoading(false));
  };

  return (
    <>
    <Header_Employer />
    <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
      <h2>Add Job</h2>
      <input type="text" name="job_name" placeholder="Job Name *" value={formData.job_name} onChange={handleChange} required />
      <input type="text" name="company_name" placeholder="Company Name *" value={formData.company_name} onChange={handleChange} required />
      <input type="text" name="job_type" placeholder="Job Type *" value={formData.job_type} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
      <input type="date" name="last_date_to_apply" placeholder="Last Date to Apply" value={formData.last_date_to_apply} onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} min="0" />
      <input type="text" name="skills_required" placeholder="Skills Required (comma separated)" value={formData.skills_required} onChange={handleChange} />
      <input type="number" name="stipend" placeholder="Stipend" value={formData.stipend} onChange={handleChange} min="0" />
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Job"}</button>
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </form>
    </>
  );
};

// const JobFilterWithUpload = () => {
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   const refreshJobs = () => {
//     setRefreshFlag(prev => !prev);
//   };

//   return (
//     <div style={{padding: "1rem", maxWidth: "800px", margin: "auto"}}>
//       <JobForm onJobAdded={refreshJobs} />
//       <JobList refreshFlag={refreshFlag} />
//     </div>
//   );
// };

export default JobFilterWithUpload;
