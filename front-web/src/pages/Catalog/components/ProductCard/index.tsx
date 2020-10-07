import React from 'react';
import ProductImage from '../../../../core/assets/images/product.png';
import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';

const ProductCard = () => (
  <div className="card-base border-radius-10 product-card">
    <img src={ProductImage} alt=""/>
    <div className="product-info">
      <h6 className="product-name">
        Computador Desktop - Intel Core i7
      </h6>
      <ProductPrice price="2.779,00" />
    </div>
  </div>
);

export default ProductCard;
