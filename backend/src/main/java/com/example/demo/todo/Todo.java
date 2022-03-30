package com.example.demo.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    private String id;
    private String task = " ";
    private String description = " ";
    private TodoCategory category = TodoCategory.Me ;
    private TodoStatus status = TodoStatus.Open;
    private String user;

}
