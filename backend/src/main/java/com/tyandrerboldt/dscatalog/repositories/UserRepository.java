package com.tyandrerboldt.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tyandrerboldt.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
