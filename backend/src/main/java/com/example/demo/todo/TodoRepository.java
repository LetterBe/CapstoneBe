package com.example.demo.todo;

import com.example.demo.todo.Model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository <Todo, String > {
    Optional<Todo> findById(String id);



}
