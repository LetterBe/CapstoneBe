package User;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;
    private String userName;
    private String password;

}
