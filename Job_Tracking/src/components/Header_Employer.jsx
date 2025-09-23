import './Header.css';
import { useState } from 'react';
import profilePhoto from './profile-avatar.png';
import logo from './logo.jpg';
import { Link } from "react-router-dom";

const Header_Employer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="employer-header">
            <div className="left-section">
                <img id="logo" src={logo} alt="Logo" />
            </div>

            <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    <img src={profilePhoto} alt="Profile" /> ▼
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <li><Link to="/EmployerProfile">View Profile</Link></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header_Employer;
