package com.example.demo.todo.modelDTO;

import com.example.demo.todo.model.Todo;
import com.example.demo.todo.TodoCategory;
import com.example.demo.todo.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {

    private String id;
    private String userEmail;
    private String task;
    private String description;
    private TodoCategory category;
    private boolean status;
    private long score;



    public static TodoDTO of(Todo todo) {
        return new TodoDTO(todo.getId(), todo.getUserEmail(), todo.getTask(), todo.getDescription(), todo.getCategory(), todo.getStatus() == TodoStatus.Done,todo.getScore());

    }

    public Todo toTodo() {
        return new Todo(id, userEmail, task, description, category, status ? TodoStatus.Done : TodoStatus.Open, score);
    }

}
