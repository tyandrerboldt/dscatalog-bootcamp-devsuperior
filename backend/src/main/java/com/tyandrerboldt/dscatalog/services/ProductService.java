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
import com.tyandrerboldt.dscatalog.dto.ProductDTO;
import com.tyandrerboldt.dscatalog.entities.Category;
import com.tyandrerboldt.dscatalog.entities.Product;
import com.tyandrerboldt.dscatalog.repositories.CategoryRepository;
import com.tyandrerboldt.dscatalog.repositories.ProductRepository;
import com.tyandrerboldt.dscatalog.services.exceptions.DatabaseException;
import com.tyandrerboldt.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> searchPaged(Long categoryId, String name, PageRequest pageRequest) {
		Category category = (categoryId == 0) ? null : categoryRepository.getOne(categoryId);
		Page<Product> list = productRepository.search(category, name, pageRequest);
		return list.map(product -> new ProductDTO(product, product.getCategories()));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(product, product.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO productDTO) {
		Product product = new Product();
		copyDtoToEntity(productDTO, product);
		product = productRepository.save(product);
		return new ProductDTO(product);
	}	

	@Transactional
	public ProductDTO update(Long productId, ProductDTO productDTO) {
		try {
			Product product = productRepository.getOne(productId);
			copyDtoToEntity(productDTO, product);
			product = productRepository.save(product);
			return new ProductDTO(product);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + productId);
		}		
	}

	public void delete(Long productId) {
		try {
			productRepository.deleteById(productId);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + productId);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(ProductDTO productDTO, Product product) {
		product.setName(productDTO.getName());
		product.setDescription(productDTO.getDescription());
		product.setDate(product.getDate());
		product.setImgUrl(productDTO.getImgUrl());
		product.setPrice(productDTO.getPrice());
		
		product.getCategories().clear();
		
		for (CategoryDTO categoryDTO : productDTO.getCategories()) {
			Category category = categoryRepository.getOne(categoryDTO.getId());
			product.getCategories().add(category);
		}
	}
	
}
