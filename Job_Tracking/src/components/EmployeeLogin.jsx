import react,{ useState } from 'react';
import './EmployeeLogin.css';
import { Link } from 'react-router-dom';
import Header from './Header_out';
const EmployeeLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${formData.email}`);
  };

  return (
    <div className="auth-container">
      <Header></Header>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Employee Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Link to="/Home"><button type="submit">Login</button></Link>
      </form>

      {/* Additional Links */}
      <div className="auth-links">
        <a href="/forgot-password" className="auth-link">Forgot Password?</a>
        <span> | </span>
        <Link to="/employeeSignup">Sign Up</Link>
      </div>
    </div>
  );
};

export default EmployeeLogin;
