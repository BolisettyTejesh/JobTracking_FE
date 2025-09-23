import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import NotificationList from './components/NotificationPage/Notification';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
  
)
