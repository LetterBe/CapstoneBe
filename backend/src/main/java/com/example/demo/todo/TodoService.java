package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public void createTodo (Todo todo) {
        todoRepository.save(todo);
    }

}
