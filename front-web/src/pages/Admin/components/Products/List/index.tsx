import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';

const List = () => {
  const history = useHistory();
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    }    

    setIsLoading(true);
    makeRequest({url:'/products', params})
    .then(response => setProductResponse(response.data))
    .finally(() => setIsLoading(false))
  }, [activePage])

  const handleCreate = () => {
    history.push('/admin/products/create');
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {!isLoading && productResponse?.content.map(product => (
          <Card product={product} key={product.id} />
        ))}
        {productResponse && (
          <Pagination 
            onChange={page => setActivePage(page)} 
            activePage={activePage} 
            totalPages={productResponse.totalPages} 
          />
        )}
      </div>
    </div>
  )
}

export default List;
