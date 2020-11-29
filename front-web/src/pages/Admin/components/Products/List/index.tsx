import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import { ProductResponse } from 'core/types/Product';
import { makeRequest, makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/CardLoader';

const List = () => {
  const history = useHistory();
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
   
  const getProducts = useCallback(() => {
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

  useEffect(() => {
    getProducts()
  }, [getProducts])
  
  const handleCreate = () => {
    history.push('/admin/products/create');
  }

  const onRemove = (productId: number) => {
    let confirm = window.confirm("Deseja realmente excluir este produto?")
    if(confirm){
      makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
        .then(() => {
          toast.info("Produto removido com sucesso!");
          getProducts();
        })
        .catch(() => {
          toast.error("Erro ao tentar remover produto!");
        });
    }
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          productResponse?.content.map(product => (
            <Card product={product} key={product.id} onRemove={onRemove} />
          ))
        )}
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
