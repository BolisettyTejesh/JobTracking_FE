package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepo;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private User_Personal_Details_Repo userRepo;

    public List<Notification> getNotificationsByEmail(String email) {
        return notificationRepo.findByUserEmail(email);
    }

    public Notification saveNotification(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        notification.setReadStatus(false);
        return notificationRepo.save(notification);
    }

    public Optional<Notification> markAsRead(Long id) {
        Optional<Notification> optional = notificationRepo.findById(id);
        optional.ifPresent(notification -> {
            notification.setReadStatus(true);
            notificationRepo.save(notification);
        });
        return optional;
    }

    public void deleteNotification(Long id) {
        notificationRepo.deleteById(id);
    }

    public void markAllAsRead(String email) {
        List<Notification> list = notificationRepo.findByUserEmail(email);
        for (Notification n : list) {
            n.setReadStatus(true);
        }
        notificationRepo.saveAll(list);
    }

    public void sendEmailNotification(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

    public void createJobMatchNotification(Job job, String userEmail) {
        // Get user's skills
        User_Personal_Details user = userRepo.findById(userEmail).orElse(null);
        if (user == null) return;

        // Calculate match score based on skills
        double matchScore = calculateMatchScore(user.getSkills(), job.getSkills_required());
        
        // Create notification if match score is above threshold
        if (matchScore > 0.5) {
            Notification notification = new Notification();
            notification.setUserEmail(userEmail);
            notification.setJobId(job.getId().toString());
            notification.setTitle("New Job Match!");
            notification.setMessage("A new job matching your skills has been posted: " + job.getJob_name() + " at " + job.getCompany_name());
            notification.setMatchScore(matchScore);
            
            // Save notification
            saveNotification(notification);
            
            // Send email notification
            sendEmailNotification(
                userEmail,
                "New Job Match Found!",
                "A new job matching your skills has been posted:\n\n" +
                "Position: " + job.getJob_name() + "\n" +
                "Company: " + job.getCompany_name() + "\n" +
                "Location: " + job.getLocation() + "\n" +
                "Match Score: " + String.format("%.0f%%", matchScore * 100) + "\n\n" +
                "Log in to your account to view more details and apply!"
            );
        }
    }

    private double calculateMatchScore(List<String> userSkills, String jobSkills) {
        if (userSkills == null || jobSkills == null) return 0.0;
        
        String[] requiredSkills = jobSkills.toLowerCase().split(",");
        int matches = 0;
        
        for (String skill : requiredSkills) {
            if (userSkills.stream().anyMatch(s -> s.toLowerCase().contains(skill.trim()))) {
                matches++;
            }
        }
        
        return (double) matches / requiredSkills.length;
    }
} 