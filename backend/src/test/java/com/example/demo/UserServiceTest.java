package com.example.demo;

import com.example.demo.login.LoginData;
import com.example.demo.user.UserDocument;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;


public class UserServiceTest {


    @Test
    void shouldCreateUser () {
        UserDocument userToBeCreated = new UserDocument(null,"Ivna","ivna@web.de", "1234");
        UserDocument savedUser = new UserDocument("444","Ivna","ivna@web.de", "1234");

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        Mockito.when(userRepository.save(userToBeCreated)).thenReturn(savedUser);

        UserService userService = new UserService(userRepository);
        UserDocument actual = userService.createUser(userToBeCreated);

        Assertions.assertThat(actual).isSameAs(savedUser);
    }

    @Test
    void shouldFindByEmail () {
        UserDocument userToBeFound = new UserDocument("444", "Ivna","ivna@web.de", "1234");

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        Mockito.when(userRepository.findByEmail("ivna@web.de")).thenReturn(Optional.of(userToBeFound));

        UserService userService = new UserService(userRepository);

        Assertions.assertThat(userService.findByEmail("ivna@web.de")).contains(userToBeFound);




    }
}
