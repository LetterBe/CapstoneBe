package com.example.demo;

import com.example.demo.todo.*;

import com.example.demo.todo.Model.Todo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;


public class TodoServiceTest {

    @Test
    @DisplayName("test to create a Todo method")
    void shouldCreateTodo() {
        Todo todo = new Todo (null, "learn", "for java test", TodoCategory.Me, TodoStatus.Open, "Bárbara");
        Todo savedTodo = new Todo ("111", "learn", "for java test", TodoCategory.Me, TodoStatus.Open, "Bárbara");

        TodoRepository todoRepository = Mockito.mock(TodoRepository.class);
        when(todoRepository.save(todo)).thenReturn(savedTodo);

        TodoService todoService = new TodoService(todoRepository);
        Todo actual = todoService.createTodo(todo);

        Assertions.assertThat(actual).isSameAs(savedTodo);
    }

    @Test
    @DisplayName("test to get all Todos")
    void shouldGetAllTodos () {
        Todo todo1 = new Todo ("111", "learn", "for java test", TodoCategory.Me, TodoStatus.Open, "Bárbara");
        Todo todo2 = new Todo ("222", "write", "for java test", TodoCategory.Home, TodoStatus.Open, "Ana");
        Todo todo3 = new Todo ("333", "debug", "for java test", TodoCategory.Work, TodoStatus.Open, "André");

        TodoRepository todoRepository = Mockito.mock(TodoRepository.class);
        when(todoRepository.findAll()).thenReturn(List.of(todo1, todo2, todo3));

        TodoService todoService = new TodoService(todoRepository);
        Collection<Todo> actual = todoService.findAll();

        Assertions.assertThat(actual).isEqualTo(List.of(todo1, todo2, todo3));
    }

    @Test
    @DisplayName("test to get one Todo")
    void shouldGetOneTodobyId () {
        Todo todo1 = new Todo();
        todo1.setId("333");
        todo1.setTask("Write");
        todo1.setDescription("one hour per day");
        todo1.setCategory(TodoCategory.Kids);
        todo1.setStatus(TodoStatus.Open);
        todo1.setCreatedBy("John");

        TodoRepository todoRepository = Mockito.mock(TodoRepository.class);
        when(todoRepository.findById(todo1.getId())).thenReturn(Optional.of(todo1));

        TodoService todoService = new TodoService(todoRepository);

        Optional<Todo> actual = todoService.findById(todo1.getId());

        Assertions.assertThat(actual).isEqualTo(Optional.of(todo1));

    }



}
