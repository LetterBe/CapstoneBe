package com.example.demo.todo;

import com.example.demo.todo.Model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository <Todo,String > {
}
