import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "../components/ui/use-toast";
import { matchJobToUser } from "../utils/notificationMatcher";
import { sendEmailNotification } from "../utils/emailService";
import axios from "axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState("both");
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/notifications/all`);
        console.log("Notification response:", response.data);
        if (response.data) {
          setNotifications(response.data);
        } else {
          console.log("No notifications found");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error.response?.data || error.message);
        console.error("Full error object:", error);
        toast({
          title: "Error",
          description: "Failed to fetch notifications. Please try again later.",
          variant: "destructive"
        });
      }
    };
    fetchNotifications();
  }, []);

  const addNotification = async (notification) => {
    const newNotification = {
      ...notification,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await axios.post("http://localhost:8084/api/notifications/add", newNotification);
      setNotifications(prev => [response.data, ...prev]);
      toast({ 
        title: newNotification.title, 
        description: newNotification.message 
      });
    } catch (error) {
      console.error("Error adding notification:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: "Failed to add notification. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8084/api/notifications/read/${id}`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error marking as read:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive"
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:8084/api/notifications/mark-all-read`);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive"
      });
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/notifications/delete/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive"
      });
    }
  };

  const checkForJobMatches = async (job, users) => {
    users.forEach(user => {
      const { isMatch, score, matchReason } = matchJobToUser(job, user);
      if (isMatch) {
        const message = `${job.title} at ${job.company} matches your profile (${matchReason})`;
        if (notificationType === "in-app" || notificationType === "both") {
          addNotification({
            jobId: job.id,
            title: "New Job Match!",
            message,
            read: false,
            matchScore: score
          });
        }
        if (notificationType === "email" || notificationType === "both") {
          sendEmailNotification({
            to: user.email, // You can use the email in the job match process
            subject: `New Job Match: ${job.title} at ${job.company}`,
            body: `<h2>We found a job that matches your profile!</h2><p><strong>${job.title}</strong> at ${job.company}</p><p>Match score: ${score}%</p><p>Why it matches: ${matchReason}</p><p>Click <a href="/jobs/${job.id}">here</a> to view the job details.</p>`
          });
        }
      }
    });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      checkForJobMatches,
      notificationType,
      setNotificationType
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
