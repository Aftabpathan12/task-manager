package com.taskmanager.taskmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.TaskRepository;
import com.taskmanager.taskmanagement.repository.UserRepository;

@Service
public class AdminService {

	
	

	    private final UserRepository userRepo;
	    private final TaskRepository taskRepo;

	    public AdminService(UserRepository userRepo, TaskRepository taskRepo) {
	        this.userRepo = userRepo;
	        this.taskRepo = taskRepo;
	    }

	    // 👤 All users
	    public List<User> getAllUsers() {
	        return userRepo.findAll();
	    }

	    // ❌ Delete user
	    public void deleteUser(Long id) {
	        userRepo.deleteById(id);
	    }

	    // 📋 All tasks
	    public List<Task> getAllTasks() {
	        return taskRepo.findAll();
	    }
	

}
