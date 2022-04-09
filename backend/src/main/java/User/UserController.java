package User;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.InputMismatchException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public UserDocument createUser (@RequestBody UserDocument newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userService.createUser(newUser);
    }

    @GetMapping("/me")
        public ResponseEntity<UserDocument> me (Principal principal){
            return ResponseEntity.of(userService.findByEmail(principal.getName()));
        }

    }
