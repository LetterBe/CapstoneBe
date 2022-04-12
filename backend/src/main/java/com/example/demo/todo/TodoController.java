package com.example.demo.todo;

import com.example.demo.todo.modelDTO.TodoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo (@RequestBody TodoDTO todo, Principal principal) {
        todo.setUserEmail(principal.getName());
        return  ResponseEntity
                .status(201)
                .body(TodoDTO.of(todoService.createTodo(todo.toTodo())));

    }

    @GetMapping
    public List<TodoDTO> getTodosbyUserEmail (Principal principal){
        return todoService.getTodosbyUserEmail(principal.getName())
                .stream()
                .map(todo -> TodoDTO.of(todo))
                .toList();
    }

   @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodo(@PathVariable String id) {
       return ResponseEntity.of(todoService.findById(id)
               .map(todo -> TodoDTO.of(todo)));

   }

   @PutMapping ("/{id}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable String id, @RequestBody TodoDTO todo, Principal principal) {
        return ResponseEntity.of(todoService.updateTodo(id, principal.getName(), todo.toTodo())
                        .map(updatedTodo -> TodoDTO.of(updatedTodo)));

        }

   @DeleteMapping("/{id}")
    public ResponseEntity<List<TodoDTO>>deleteTodoById(@PathVariable String id, Principal principal) {
        if (todoService.deleteById(id, principal.getName()).isPresent()){
            List<TodoDTO> todos = todoService.getTodosbyUserEmail(principal.getName())
                    .stream()
                    .map(todo -> TodoDTO.of(todo))
                    .toList();
            ResponseEntity.accepted().body(todos);
       }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
   }


}
