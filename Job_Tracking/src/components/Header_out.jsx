import './Header_out.css';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header>
                <div className="left-section">
                    <img id="logo" src={logo} alt="Logo" />
                    <div className="nav-links">
                        <Link to="/" className="routes">Home</Link>
                        <a href="#" className="routes">Jobs</a>
                        
                    </div>
                </div>

                <div className="auth-buttons">
                    <Link to="/employeeLogin" >Employee</Link>
                    <Link to="/employerLogin" >Employer</Link>
                </div>
            </header>
        </div>
    );
};

export default Header;
