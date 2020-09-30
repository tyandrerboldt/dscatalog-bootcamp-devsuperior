package com.tyandrerboldt.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tyandrerboldt.dscatalog.dto.CategoryDTO;
import com.tyandrerboldt.dscatalog.entities.Category;
import com.tyandrerboldt.dscatalog.repositories.CategoryRepository;
import com.tyandrerboldt.dscatalog.services.exceptions.EntityNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository; 
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = categoryRepository.findAll();
		return list.stream().map(
				category -> new CategoryDTO(category)
				).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
		return new CategoryDTO(category);
	}
	
}
