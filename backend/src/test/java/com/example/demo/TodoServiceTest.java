package com.example.demo;

import com.example.demo.todo.*;

import com.example.demo.todo.Model.Todo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


public class TodoServiceTest {

    @Test
    @DisplayName("test the create a Todo Methode")
    void shouldCreateTodo() {
        Todo todo = new Todo (null, "learn", "for java test", TodoCategory.Me, TodoStatus.Open, "Bárbara");
        Todo savedTodo = new Todo ("111", "learn", "for java test", TodoCategory.Me, TodoStatus.Open, "Bárbara");

        TodoRepository todoRepository = Mockito.mock(TodoRepository.class);
        Mockito.when(todoRepository.save(todo)).thenReturn(savedTodo);

        TodoService todoService = new TodoService(todoRepository);
        Todo actual = todoService.createTodo(todo);

        Assertions.assertThat(actual).isSameAs(savedTodo);






    }
}
