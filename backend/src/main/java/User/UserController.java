package User;

import Login.LoginData;
import Security.JwtService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private JwtService jwtService;

    @PostMapping("/register")
    public UserDocument createUser (@RequestBody UserDocument newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userService.createUser(newUser);
    }

    @PostMapping
        public ResponseEntity<String> login (@RequestBody LoginData loginData){
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getEmailLogin(), loginData.getPassword()));
            Map<String, Object> claims = new HashMap<>();
            return ResponseEntity.ok(jwtService.createToken(claims, loginData.getEmailLogin()));
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        }

    }
