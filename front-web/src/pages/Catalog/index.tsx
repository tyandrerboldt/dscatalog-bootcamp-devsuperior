import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { makeRequest } from 'core/utils/request';
import { ProductResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import './styles.scss';

const Catalog = () => {

  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12
    }    

    setIsLoading(true);
    makeRequest({url:'/products', params})
    .then(response => setProductResponse(response.data))
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de produtos</h1>
      <div className="catalog-products">
        { isLoading ? <ProductCardLoader /> : (
          productResponse?.content.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}><ProductCard product={product} /></Link>
          ))
        )}        
      </div>
      <Pagination />
    </div>
  );
};

export default Catalog;
