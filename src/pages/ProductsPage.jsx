import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";
import ProductCard from '../molecules/ProductCard.jsx';

export default function ProductsPage({ addToCart }) {
  const [products, setProducts] = useState([]);  
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  // Cargar productos desde API
  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  // categorias dinámicas
  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  );

  // filtrado
  const filtered = products.filter(p =>
    (category ? p.category === category : true) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      
      {/* filtros */}
      <aside style={{ width: '200px' }}>
        <h3>Buscar:</h3>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <h3>Categorías:</h3>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </aside>

      {/* listado */}
      <section style={{ flex: 1 }}>
        <div className="product-grid">
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} onAdd={() => addToCart(prod)} />
          ))}
        </div>
        {filtered.length === 0 && <p>No se encontraron productos.</p>}
      </section>

    </div>
  );
}
