package User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.InputMismatchException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDocument createUser(UserDocument user) {
            if (findByEmail(user.getEmail()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
            } else{
                return userRepository.save(user);
            }
    }


    public Optional<UserDocument> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

