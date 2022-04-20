package com.example.demo;


import com.example.demo.login.LoginData;
import com.example.demo.todo.model.Todo;
import com.example.demo.todo.modelDTO.TodoDTO;
import com.example.demo.user.UserDocument;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class IntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    // Test-Object

    final private Todo todoItem1 = new Todo();
    final private Todo todoItem2 = new Todo();


    /*@Test
    @Order(1)
    void shouldCreateNewTodoItem () {
        ResponseEntity<UserDocument> createUserResponse = restTemplate.postForEntity("api/login/register", new UserDocument("3","mustermensch@web.de", "3456b"),UserDocument.class );
        Assertions.assertThat(createUserResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/api/login", new LoginData("mustermensch@web.de", "3456b"), String.class);
        Assertions.assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(loginResponse.getBody()).isNotBlank();

        ResponseEntity<TodoDTO> createTodoItem = restTemplate.exchange(
                "/api/todos",
                HttpMethod.POST,
                new HttpEntity<>(todoItem1, createHeaders(loginResponse.getBody()) )
        )
    }

    private HttpHeaders createHeaders(String token){
        String authHeader = "Bearer " + token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        return headers;
    }*/

}
