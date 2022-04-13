package com.example.demo.todo;

import com.example.demo.todo.model.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public List<Todo>getTodosbyUserEmail(String email) {
        return todoRepository.findAllByUserEmail(email);
    }

    public Optional<Todo> findById(String id) {
            return todoRepository.findById(id);
        }
    public Optional<Todo> updateTodo (String id, String email, Todo updatedTodo) {
        return todoRepository.findByIdAndUserEmail(id, email)
                .map(todo -> todo.update(updatedTodo))
                .map(todoRepository::save);
    }

    public Optional<Todo> deleteById (String id, String email){
        Optional<Todo> todoToDelete = todoRepository.findByIdAndUserEmail(id, email);
        if(todoToDelete.isPresent()) {
            todoRepository.deleteById(id);
        }
        return todoToDelete;
    }

}
