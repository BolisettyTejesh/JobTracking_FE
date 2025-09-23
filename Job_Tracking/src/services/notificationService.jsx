import axios from 'axios';

const API_URL = 'http://localhost:8084/api/notifications';

const notificationService = {
  // ✅ Get all notifications (no userEmail filter)
  getAllNotifications: async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all notifications:', error);
      throw error;
    }
  },

  // Create a new notification
  createNotification: async (notification) => {
    try {
      const response = await axios.post(`${API_URL}/add`, notification);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await axios.put(`${API_URL}/read/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Delete a notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Send email notification
  sendEmailNotification: async (emailData) => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, emailData);
      return response.data;
    } catch (error) {
      console.error('Error sending email notification:', error);
      throw error;
    }
  }
};

// ✅ Correct default export
export default notificationService;
