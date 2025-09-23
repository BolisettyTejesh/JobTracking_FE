import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FaBriefcase } from "react-icons/fa"; // Example icon import

// You can create a separate App.jsx file or define the component here
function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <FaBriefcase style={{ marginRight: '10px' }} />
        Job Tracking App
      </h1>
      <p>
        Your application is running. You can now build your components.
      </p>
    </div>
  );
}

// Renders your application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
