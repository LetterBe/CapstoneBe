package com.example.demo.todo;

import com.example.demo.todo.modelDTO.TodoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/api/todos")
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
    public Collection<TodoDTO> getTodos (Principal principal){
        String name = principal.getName();
        return todoService.findAll().stream()
                .map(todo -> TodoDTO.of(todo))
                .toList();
    }

   @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodo(@PathVariable String id) {
       return ResponseEntity.of(todoService.findById(id)
               .map(todo -> TodoDTO.of(todo)));

   }

   @PutMapping ("/{id}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable String id, @RequestBody TodoDTO todo) {
        return ResponseEntity.of(todoService.updateTodo(id, todo.toTodo())
                        .map(updatedTodo -> TodoDTO.of(updatedTodo)));

        }

   @DeleteMapping("/{id}")
    public Collection<TodoDTO> deleteTodoById(@PathVariable String id) {
        todoService.deleteById(id);
        return todoService.findAll().stream()
                .map(todoToDelete -> TodoDTO.of(todoToDelete))
                .toList();
   }


}
