package com.example.demo.todo.ModelDTO;

import com.example.demo.todo.Model.Todo;
import com.example.demo.todo.TodoCategory;
import com.example.demo.todo.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {

    private String task;
    private String description;
    private TodoCategory category;
    private TodoStatus status;
    private String createdBy;


    public static TodoDTO of (Todo todo) {
        return new TodoDTO( todo.getTask(), todo.getDescription(), todo.getCategory(), todo.getStatus(), todo.getCreatedBy());

    }

    public Todo toTodo() {
        return new Todo (null, task, description, category, status, createdBy);
    }

    public Todo getId(String id) {
        return new Todo ();
    }
}
