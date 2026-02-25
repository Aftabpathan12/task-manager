package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.service.TaskService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // ✅ GET logged-in user's tasks
    @GetMapping
    public List<Task> getMyTasks() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        return taskService.getTasksByUserEmail(email);
    }

    // ✅ POST add task
    @PostMapping
    public Task addTask(@RequestBody Task task) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        return taskService.addTask(task, email);
    }

    // ✅ UPDATE task
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task
    ) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        return taskService.updateTask(id, task, email);
    }

    // ✅ DELETE task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        taskService.deleteTask(id, email);
    }
}
