package com.tyandrerboldt.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tyandrerboldt.dscatalog.dto.UserDTO;
import com.tyandrerboldt.dscatalog.dto.UserInsertDTO;
import com.tyandrerboldt.dscatalog.dto.UserUpdateDTO;
import com.tyandrerboldt.dscatalog.services.UserService;

@RestController
@RequestMapping("/users")
public class UserResource {

	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "firstName") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<UserDTO> list = userService.findAllPaged(pageRequest);
		
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long userId){
		UserDTO userDTO = userService.findById(userId);
		return ResponseEntity.ok(userDTO);
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert(@Valid @RequestBody UserInsertDTO userDTO){
		UserDTO userNewDTO = userService.insert(userDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{userId}")
				.buildAndExpand(userNewDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(userNewDTO);
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<UserDTO> update(@PathVariable Long userId,
			@Valid @RequestBody UserUpdateDTO userDTO){
		UserDTO newUserDTO = userService.update(userId, userDTO);
		return ResponseEntity.ok().body(newUserDTO);
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<UserDTO> delete(@PathVariable Long userId){
		userService.delete(userId);
		return ResponseEntity.noContent().build();
	}
	
}
