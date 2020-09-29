package com.tyandrerboldt.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tyandrerboldt.dscatalog.entities.Category;

@RestController
@RequestMapping("/categories")
public class CategoryResource {

	@GetMapping
	public ResponseEntity<List<Category>> findAll(){
		List<Category> list = new ArrayList<>();
		return ResponseEntity.ok(list);
	}
	
}
