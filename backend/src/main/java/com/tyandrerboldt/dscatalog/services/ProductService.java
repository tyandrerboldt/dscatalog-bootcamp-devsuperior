package com.tyandrerboldt.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tyandrerboldt.dscatalog.dto.ProductDTO;
import com.tyandrerboldt.dscatalog.entities.Product;
import com.tyandrerboldt.dscatalog.repositories.ProductRepository;
import com.tyandrerboldt.dscatalog.services.exceptions.DatabaseException;
import com.tyandrerboldt.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository; 
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = productRepository.findAll(pageRequest);
		return list.map(product -> new ProductDTO(product));
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
		//product.setName(productDTO.getName());
		product = productRepository.save(product);
		return new ProductDTO(product);
	}

	@Transactional
	public ProductDTO update(Long productId, ProductDTO productDTO) {
		try {
			Product product = productRepository.getOne(productId);
			//product.setName(productDTO.getName());
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
	
}
