package com.tyandrerboldt.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tyandrerboldt.dscatalog.dto.CategoryDTO;
import com.tyandrerboldt.dscatalog.entities.Category;
import com.tyandrerboldt.dscatalog.repositories.CategoryRepository;
import com.tyandrerboldt.dscatalog.services.exceptions.DatabaseException;
import com.tyandrerboldt.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository; 
	
	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(PageRequest pageRequest) {
		Page<Category> list = categoryRepository.findAll(pageRequest);
		return list.map(category -> new CategoryDTO(category));
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoryDTO(category);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO categoryDTO) {
		Category category = new Category();
		category.setName(categoryDTO.getName());
		category = categoryRepository.save(category);
		return new CategoryDTO(category);
	}

	@Transactional
	public CategoryDTO update(Long categoryId, CategoryDTO categoryDTO) {
		try {
			Category category = categoryRepository.getOne(categoryId);
			category.setName(categoryDTO.getName());
			category = categoryRepository.save(category);
			return new CategoryDTO(category);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + categoryId);
		}		
	}

	public void delete(Long categoryId) {
		try {
			categoryRepository.deleteById(categoryId);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + categoryId);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
}
