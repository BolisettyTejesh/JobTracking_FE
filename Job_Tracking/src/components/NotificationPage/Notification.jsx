import React, { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import "./Notifications.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getAllNotifications(); // Changed
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const sendEmailNotification = async (notification) => {
    try {
      await notificationService.sendEmailNotification({
        to: notification.userEmail, // Assumes notification contains userEmail
        subject: "New Job Application Update",
        message: notification.message,
      });
    } catch (err) {
      console.error("Error sending email notification:", err);
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notification-container">
      <h2 className="title">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`notification-card ${n.read ? "read" : "unread"}`}
          >
            <div className="notification-content">
              <div className="notification-info">
                <p className="message">{n.message}</p>
                <p className="timestamp">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="notification-actions">
                {!n.read && (
                  <>
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="mark-read-btn"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => sendEmailNotification(n)}
                      className="email-btn"
                    >
                      Apply Now
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
            {!n.read && <span className="badge">Unread</span>}
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
