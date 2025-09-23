import React from "react";
import "./About.css";
import Header from "./Header_out";
const About = () => {
  return (
    <div className="about-page">
      <Header></Header>
      <div className="about-container">
        <h1>About CareerConnect</h1>
        <p>
          CareerConnect is an online job application tracker designed to simplify and 
          streamline your job search process. Our platform centralizes your job-related activities, 
          allowing you to save job postings, track application statuses, and set follow-up reminders all in one secure place.
        </p>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower job seekers by giving them the tools they need to organize their career journeys, 
            make informed decisions, and stay ahead of the competition. We believe that the right job 
            should be accessible to everyone and that a well-structured application process can unlock opportunities.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Centralized Dashboard:</strong> Manage all your job applications in one place.</li>
            <li><strong>Application Tracking:</strong> Easily track application statuses from “Applied” to “Interview” to “Offer”.</li>
            <li><strong>Reminders & Notifications:</strong> Set reminders for important dates like follow-ups and interviews.</li>
            <li><strong>Insights & Analytics:</strong> Gain detailed insights into your application progress and success rates.</li>
            <li><strong>User-Friendly Interface:</strong> Enjoy an intuitive and responsive design for a seamless experience.</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            Our platform allows you to quickly register an account and start saving job postings with just a few clicks. 
            Once registered, you can organize your applications by status, receive personalized job recommendations based on your profile, 
            and use our calendar tool to manage interviews and follow-ups. This centralized system saves time and ensures you never miss an opportunity.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose CareerConnect?</h2>
          <p>
            Whether you're actively applying or just exploring the job market, CareerConnect offers a simple, secure, 
            and effective way to manage your career journey. With our platform:
          </p>
          <ul>
            <li>You can effortlessly keep track of the ever-changing statuses of your applications.</li>
            <li>Our insightful analytics provide a clear overview of your job search progress.</li>
            <li>Notifications and reminders help you stay organized and ready for upcoming interviews.</li>
            <li>Our user-centric design ensures a seamless experience that lets you focus on your career growth.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
