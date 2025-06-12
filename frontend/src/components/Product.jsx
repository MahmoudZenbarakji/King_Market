import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* In a real app, you would use actual product images */}
        <div className="product-image-placeholder">
          {product.name.split(' ').map(word => word.charAt(0)).join('')}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-category">
          {product.category === 'meats' && '🥩 Meats'}
          {product.category === 'canned' && '🥫 Canned Food'}
          {product.category === 'produce' && '🥦 Fruits & Vegetables'}
          {product.category === 'other' && '📦 Other Items'}
        </div>
      </div>
    </div>
  );
};

export default Product;