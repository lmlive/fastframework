package rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livem.quickframework.entity.SystemUser;

public interface SystemUserRepository extends JpaRepository<SystemUser, Long>{

}
