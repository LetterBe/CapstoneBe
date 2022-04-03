package com.example.demo.todo.Model;

import com.example.demo.todo.TodoCategory;
import com.example.demo.todo.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "tasks")
@Data
@AllArgsConstructor
public class Todo {

    @Id
    private String id;
    private String task;
    private String description;
    private TodoCategory category;
    private TodoStatus status;
    private String createdBy;

    }




