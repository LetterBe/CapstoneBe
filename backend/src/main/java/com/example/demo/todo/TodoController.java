package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createTodo (@RequestBody TodoDTO todo) {
        todoService.createTodo(todo);
    }

}
