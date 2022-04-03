package com.example.demo.todo;

import com.example.demo.todo.Model.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo createTodo (Todo todo) {
        return todoRepository.save(todo);
    }

}
