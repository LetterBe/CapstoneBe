package com.example.demo.todo.model;

import com.example.demo.todo.TodoCategory;
import com.example.demo.todo.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "tasks")
@Data
@AllArgsConstructor
public class Todo {

    @Id
    private String id;
    private String userEmail;
    private String task;
    private String description;
    private TodoCategory category;
    private TodoStatus status;


    public Todo() {

    }


    public Todo update(Todo updatedTodo) {
        task = updatedTodo.getTask();
        description = updatedTodo.getDescription();
        category = updatedTodo.getCategory();
        status = updatedTodo.getStatus();
        return this;
    }
}




