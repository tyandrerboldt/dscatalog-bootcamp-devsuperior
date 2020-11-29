import React from 'react';
import './styles.scss';
import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Product';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  onRemove: (productId: number) => void;
}

const Card = ({ product, onRemove }: Props) => {
  return (
    <div className="card-base product-card-admin">
      <div className="row">
        <div className="col-2 text-center border-right py-3">
          <img 
            src={product.imgUrl} 
            className="product-card-image-admin"
            alt={product.name}
          />
        </div>
        <div className="col-7 py-3">
          <h3 className="product-card-name-admin">
             {product.name}
          </h3>
          <ProductPrice price={product.price} />
          <div>
            {product.categories.map(category => (
              <span 
                key={category.id} 
                className="badge bagde-pill badge-secondary mr-2"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-3 pr-5 d-flex flex-column justify-content-center">
          <Link 
            to={`/admin/products/${product.id}`}
            className="btn btn-outline-secondary btn-edit mb-2 border-radius-10">
              Editar
          </Link>
          <button 
            className="btn btn-outline-danger border-radius-10"
            onClick={() => onRemove(product.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;
