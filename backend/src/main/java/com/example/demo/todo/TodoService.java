package com.example.demo.todo;

import com.example.demo.todo.Model.Todo;
import com.example.demo.todo.ModelDTO.TodoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;
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

}
