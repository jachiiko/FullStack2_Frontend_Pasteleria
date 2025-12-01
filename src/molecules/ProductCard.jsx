import React from 'react';
import Button from '../atoms/Button.jsx';

export default function ProductCard({ product, onAdd }) {
  const imgSrc = product.imageUrl || product.imageurl;

  return (
    <div className="product-card">
      <img
        src={imgSrc}
        alt={product.name}
        style={{ objectFit: 'cover' }}
      />

      <div className="product-card-content">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-price">
          ${product.price.toLocaleString('es-CL')}
        </div>

        <Button className="add-btn" onClick={() => onAdd(product)}>
          Añadir
        </Button>
      </div>
    </div>
  );
}
