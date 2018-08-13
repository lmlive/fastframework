package rest;

import com.livem.quickframework.entity.SystemUser;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import rest.repository.SystemUserRepository;

@EntityScan(basePackageClasses=SystemUser.class)
@Configuration
@SpringBootApplication
@EnableJpaRepositories(basePackageClasses=SystemUserRepository.class)
public class config {

}
