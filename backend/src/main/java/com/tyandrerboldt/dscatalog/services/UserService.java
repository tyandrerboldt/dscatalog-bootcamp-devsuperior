package com.tyandrerboldt.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tyandrerboldt.dscatalog.dto.RoleDTO;
import com.tyandrerboldt.dscatalog.dto.UserDTO;
import com.tyandrerboldt.dscatalog.dto.UserInsertDTO;
import com.tyandrerboldt.dscatalog.dto.UserUpdateDTO;
import com.tyandrerboldt.dscatalog.entities.Role;
import com.tyandrerboldt.dscatalog.entities.User;
import com.tyandrerboldt.dscatalog.repositories.RoleRepository;
import com.tyandrerboldt.dscatalog.repositories.UserRepository;
import com.tyandrerboldt.dscatalog.services.exceptions.DatabaseException;
import com.tyandrerboldt.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest) {
		Page<User> list = userRepository.findAll(pageRequest);
		return list.map(user -> new UserDTO(user));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(user);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO userDTO) {
		User user = new User();
		copyDtoToEntity(userDTO, user);
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user = userRepository.save(user);
		return new UserDTO(user);
	}	

	@Transactional
	public UserDTO update(Long userId, UserUpdateDTO userDTO) {
		try {
			User user = userRepository.getOne(userId);
			copyDtoToEntity(userDTO, user);
			user = userRepository.save(user);
			return new UserDTO(user);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + userId);
		}		
	}

	public void delete(Long userId) {
		try {
			userRepository.deleteById(userId);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + userId);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(UserDTO userDTO, User user) {
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setEmail(userDTO.getEmail());
		
		user.getRoles().clear();
		
		for (RoleDTO roleDTO : userDTO.getRoles()) {
			Role role = roleRepository.getOne(roleDTO.getId());
			user.getRoles().add(role);
		}
	}
	
}
