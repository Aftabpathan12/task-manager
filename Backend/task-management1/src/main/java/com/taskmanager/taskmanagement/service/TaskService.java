package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.TaskRepository;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    public List<Task> getTasksByUserEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepo.findByAssignedTo(user);
    }
    public Task addTask(Task task, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setAssignedTo(user);

        return taskRepo.save(task);
    }
    
    public Task updateTask(Long id, Task updatedTask, String email) {

        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // ✅ ownership check
        if (!task.getAssignedTo().getEmail().equals(email)) {
            throw new RuntimeException("Not allowed");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepo.save(task);
    }

    public void deleteTask(Long id, String email) {

        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getAssignedTo().getEmail().equals(email)) {
            throw new RuntimeException("Not allowed");
        }

        taskRepo.delete(task);
    }


}
