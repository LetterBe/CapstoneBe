package com.example.demo.todo;

import com.example.demo.todo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository <Todo, String > {
    List<Todo> findAllByUserEmail(String email);

    Optional<Todo> findByIdAndUserEmail(String id, String email);

}
