package com.tyandrerboldt.dscatalog.resources;

import java.net.URI;

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

import com.tyandrerboldt.dscatalog.dto.CategoryDTO;
import com.tyandrerboldt.dscatalog.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryResource {

	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<Page<CategoryDTO>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<CategoryDTO> list = categoryService.findAllPaged(pageRequest);
		
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryDTO> findById(@PathVariable Long categoryId){
		CategoryDTO categoryDTO = categoryService.findById(categoryId);
		return ResponseEntity.ok(categoryDTO);
	}
	
	@PostMapping
	public ResponseEntity<CategoryDTO> insert(@RequestBody CategoryDTO categoryDTO){
		categoryDTO = categoryService.insert(categoryDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{categoryId}")
				.buildAndExpand(categoryDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(categoryDTO);
	}
	
	@PutMapping("/{categoryId}")
	public ResponseEntity<CategoryDTO> update(@PathVariable Long categoryId,
			@RequestBody CategoryDTO categoryDTO){
		categoryDTO = categoryService.update(categoryId, categoryDTO);
		return ResponseEntity.ok(categoryDTO);
	}
	
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<CategoryDTO> delete(@PathVariable Long categoryId){
		categoryService.delete(categoryId);
		return ResponseEntity.noContent().build();
	}
	
}
