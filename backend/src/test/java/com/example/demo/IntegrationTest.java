package com.example.demo;


import com.example.demo.login.LoginData;

import com.example.demo.todo.TodoCategory;
import com.example.demo.todo.TodoStatus;
import com.example.demo.todo.modelDTO.TodoDTO;
import com.example.demo.user.UserDocument;

import org.assertj.core.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class IntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    void integrationsTest () {
        TodoDTO todo = new TodoDTO("3", "mustermensch@web.de", "einkaufen", "milk, bread, fruits", TodoCategory.Home, false, 0);

        ResponseEntity<UserDocument> createUserResponse = restTemplate.postForEntity("/api/login/register", new UserDocument("3","mustermensch@web.de", "3456b"),UserDocument.class );
        Assertions.assertThat(createUserResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/api/login", new LoginData("mustermensch@web.de", "3456b"), String.class);

        Assertions.assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(loginResponse.getBody()).isNotBlank();

        String token = loginResponse.getBody();

        HttpHeaders baererHeader = new HttpHeaders();
        baererHeader.setBearerAuth(token);

        ResponseEntity<TodoDTO> createTodo = restTemplate.exchange(
                "/api/todos",
                HttpMethod.POST,
                new HttpEntity<>(todo, baererHeader),
                TodoDTO.class
        );


        TodoDTO createdTodo = createTodo.getBody();

        Assertions.assertThat(createTodo.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(createdTodo).isEqualTo(todo);

        TodoDTO updatedTodo = new TodoDTO("3", "mustermensch@web.de", "einkaufen", "milk,rice", TodoCategory.Home, false, 0);

        ResponseEntity<TodoDTO> updateTodo = restTemplate.exchange(
                "/api/todos/" + createdTodo.getId(),
                HttpMethod.PUT,
                new HttpEntity<>(updatedTodo, baererHeader),
                TodoDTO.class
        );


        Assertions.assertThat(updateTodo.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(updateTodo.getBody().toTodo()).isEqualTo(updatedTodo.toTodo());

        TodoDTO doneTodo = new TodoDTO("3", "mustermensch@web.de", "einkaufen", "milk,rice", TodoCategory.Home, true, 0);

        ResponseEntity<TodoDTO> setTodoDone = restTemplate.exchange(
                "/api/todos/" + doneTodo.getId(),
                HttpMethod.PUT,
                new HttpEntity<>(doneTodo, baererHeader),
                TodoDTO.class
        );

        Assertions.assertThat(setTodoDone.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(setTodoDone.getBody().toTodo().getStatus()).isEqualTo(TodoStatus.Done);


        ResponseEntity<TodoDTO[]> deleteTodoById = restTemplate.exchange(
                "/api/todos/" + doneTodo.getId(),
                HttpMethod.DELETE,
                new HttpEntity<>(baererHeader),
                TodoDTO[].class
        );

        Assertions.assertThat(deleteTodoById.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(deleteTodoById.getBody().length).isEqualTo(0);


    }




}
