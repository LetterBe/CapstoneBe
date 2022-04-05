package com.example.demo.todo;

import com.example.demo.todo.ModelDTO.TodoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

    @GetMapping
    public Collection<TodoDTO> getTodos (){
        return todoService.findAll().stream()
                .map(todo -> TodoDTO.of(todo))
                .toList();
    }

   @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodo(@PathVariable String id) {
       return ResponseEntity.of(todoService.findById(id)
                       .map(todo -> TodoDTO.of(todo)));

   }
}
