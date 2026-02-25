package com.taskmanager.taskmanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TaskRequestDTO {
    
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	private String title;
    private String description;
    private Long userId;
}
