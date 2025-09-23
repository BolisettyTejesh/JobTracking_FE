package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private JobRepo jobRepo;
    
    @Autowired
    private User_Personal_Details_Repo userRepo;

    @PostMapping
    public ResponseEntity<Job> postJob(@RequestBody Job job) {
        Job savedJob = jobRepo.save(job);
        
        // Get all users and check for matches
        List<User_Personal_Details> users = userRepo.findAll();
        for (User_Personal_Details user : users) {
            notificationService.createJobMatchNotification(savedJob, user.getEmail());
        }
        
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobRepo.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobRepo.findById(id)
            .map(existingJob -> {
                job.setId(id);
                return ResponseEntity.ok(jobRepo.save(job));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        return jobRepo.findById(id)
            .map(job -> {
                jobRepo.delete(job);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
} 