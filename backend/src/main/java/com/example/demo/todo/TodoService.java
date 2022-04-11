package com.example.demo.todo;

import com.example.demo.todo.model.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Collection<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findById(String id) {
            return todoRepository.findById(id);
        }
    public Optional<Todo> updateTodo (String id, Todo updatedTodo) {
        return todoRepository.findById(id)
                .map(todo -> todo.update(updatedTodo))
                .map(todoRepository::save);
    }

    public void deleteById(String id){
        todoRepository.deleteById(id);
    }

}
