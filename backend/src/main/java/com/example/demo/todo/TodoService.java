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

    public List<Todo> getTodosbyUserEmail(String email) {
        return todoRepository.findAllByUserEmail(email);
    }

    public Optional<Todo> findById(String id) {
        return todoRepository.findById(id);
    }

    public Optional<Todo> updateTodo(String id, String email, Todo updatedTodo) {
                Optional<Todo> todoFromDB = todoRepository.findByIdAndUserEmail(id, email);
                if(todoFromDB.isPresent()){
                    int currentScore = 0;
                    if(updatedTodo.getStatus() != todoFromDB.get().getStatus()) {
                        if (updatedTodo.getStatus() == TodoStatus.Done) {
                            currentScore++;
                        }
                    }
                    updatedTodo.setScore(currentScore);
                    todoFromDB.map(todo -> todo.update(updatedTodo))
                            .map(todoRepository::save);
                }
                return Optional.of(updatedTodo) ;

    }

    public Optional<Todo> deleteById(String id, String email) {
        Optional<Todo> todoToDelete = todoRepository.findByIdAndUserEmail(id, email);
        if (todoToDelete.isPresent()) {
            todoRepository.deleteById(id);
        }
        return todoToDelete;
    }

}
