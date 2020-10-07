import React from 'react';
import ProductImage from '../../../../core/assets/images/product.png';
import './styles.scss';

const ProductCard = () => (
  <div className="card-base border-radius-10 product-card">
    <img src={ProductImage} alt=""/>
    <div className="product-info">
      <h6 className="product-name">
        Computador Desktop - Intel Core i7
      </h6>
      <div className="product-price-container">
        <span className="product-currency">R$</span>
        <h3 className="product-price">2.779,00</h3>
      </div>
    </div>
  </div>
);

export default ProductCard;
