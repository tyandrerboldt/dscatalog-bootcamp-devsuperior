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

import com.tyandrerboldt.dscatalog.dto.ProductDTO;
import com.tyandrerboldt.dscatalog.services.ProductService;

@RestController
@RequestMapping("/products")
public class ProductResource {

	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAll(
			@RequestParam(value = "categoryId", defaultValue = "0") Integer categoryId,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<ProductDTO> list = productService.searchPaged(Long.valueOf(categoryId), pageRequest);
		
		return ResponseEntity.ok(list);
	}

//	@GetMapping
//	public ResponseEntity<Page<ProductDTO>> findAll(
//			@RequestParam(value = "page", defaultValue = "0") Integer page,
//			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
//			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
//			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy
//			){
//		
//		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
//		
//		Page<ProductDTO> list = productService.findAllPaged(pageRequest);
//		
//		return ResponseEntity.ok(list);
//	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long productId){
		ProductDTO productDTO = productService.findById(productId);
		return ResponseEntity.ok(productDTO);
	}
	
	@PostMapping
	public ResponseEntity<ProductDTO> insert(@Valid @RequestBody ProductDTO productDTO){
		productDTO = productService.insert(productDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{productId}")
				.buildAndExpand(productDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(productDTO);
	}
	
	@PutMapping("/{productId}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long productId,
			@Valid @RequestBody ProductDTO productDTO){
		productDTO = productService.update(productId, productDTO);
		return ResponseEntity.ok(productDTO);
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<ProductDTO> delete(@PathVariable Long productId){
		productService.delete(productId);
		return ResponseEntity.noContent().build();
	}
	
}
