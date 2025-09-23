import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FlexHome from "./components/FlexHome";
import Notification from "./components/NotificationPage/Notification";
import User_Profile from "./components/User_Profile";
import EmployerProfile from "./components/EmployerProfile";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeSignUp from "./components/EmployeeSignUp";
import EmployerSignUp from "./components/EmployerSignUp";
import EmployerLogin from "./components/EmployerLogin";
import Filter from "./components/Filter";
import JobFilterWithUpload from "./components/JobFilterWithUpload";
import FAQ from "./components/FAQ";
import About from "./components/About";
function App() {
  return (
    <Router>
      <Header /> {/* This ensures the header is shown on all pages */}
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element ={<HomePage />} />
        <Route path="/Home" element={<FlexHome />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/UserProfile" element={<User_Profile />} />
        <Route path="/employerProfile" element={<EmployerProfile />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
        <Route path="/employeeSignup" element={<EmployeeSignUp />} />
        <Route path="/employerSignUp" element={<EmployerSignUp />} />
        <Route path="/employerLogin" element={<EmployerLogin />} />
        <Route path="/FilterPage" element={<Filter />} />
        <Route path="/AddJobs" element={<JobFilterWithUpload />} /> 
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
        <Route path="/EmployerProfile" element={<EmployerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
