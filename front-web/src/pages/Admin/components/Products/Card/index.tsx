import React from 'react';
import './styles.scss';
import ProductPrice from 'core/components/ProductPrice';

const Card = () => {
  return (
    <div className="card-base product-card-admin">
      <div className="row">
        <div className="col-2 text-center border-right py-3">
          <img 
            src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg" 
            className="product-card-image-admin"
            alt="Foto do produto"
          />
        </div>
        <div className="col-7 py-3">
          <h3 className="product-card-name-admin">
            Nome do produto na lista
          </h3>
          <ProductPrice price={40.5} />
          <div>
            <span className="badge bagde-pill badge-secondary mr-2">Secondary</span>
            <span className="badge bagde-pill badge-secondary mr-2">Secondary</span>
            <span className="badge bagde-pill badge-secondary mr-2">Secondary</span>
          </div>
        </div>
        <div className="col-3 pr-5 d-flex flex-column justify-content-center">
          <button className="btn btn-outline-secondary btn-edit mb-2 border-radius-10">Editar</button>
          <button className="btn btn-outline-danger border-radius-10">Excluir</button>
        </div>
      </div>
    </div>
  )
}

export default Card;
