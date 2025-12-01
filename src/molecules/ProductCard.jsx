import React from 'react';
import Button from '../atoms/Button.jsx';

export default function ProductCard({ product, onAdd }) {
  const { imageUrl, imageurl, name, category, price } = product;

  return (
    <div className="product-card">
      <img
        src={imageUrl || imageurl}
        alt={name}
        style={{ objectFit: 'cover' }}
      />

      <div className="product-card-content">
        {category && <div className="product-card-category">{category}</div>}
        <div className="product-card-name">{name}</div>
        <div className="product-card-price">${price.toLocaleString()}</div>

        <Button className="add-btn" onClick={() => onAdd(product)}>
          Añadir
        </Button>
      </div>
    </div>
  );
}
