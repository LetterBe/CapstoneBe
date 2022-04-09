package Login;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth/login")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    // private JwtService jwtService;


}
