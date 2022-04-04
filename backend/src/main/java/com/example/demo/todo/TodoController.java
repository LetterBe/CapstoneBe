package com.example.demo.todo;

import com.example.demo.todo.ModelDTO.TodoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo (@RequestBody TodoDTO todo) {
        return ResponseEntity
                .status(201)
                .body(TodoDTO.of(todoService.createTodo(todo.toTodo())));

    }

}
