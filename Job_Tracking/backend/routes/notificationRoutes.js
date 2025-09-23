const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications for a user
router.get('/:userEmail', notificationController.getNotifications);

// Create a new notification
router.post('/', notificationController.createNotification);

// Mark notification as read
router.post('/mark-as-read/:id', notificationController.markAsRead);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

// Send email notification
router.post('/send-email', notificationController.sendEmailNotification);

module.exports = router; 