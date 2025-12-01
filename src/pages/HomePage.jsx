import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../molecules/ProductCard.jsx";

export default function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Tomar 4 productos destacados
  const destacados = products.slice(0, 4);

  return (
    <section>
      <h1>Bienvenido a 1000 Sabores</h1>
      <p>Endulza tu día con nuestros productos destacados.</p>

      <div className="product-grid">
  {destacados.map((p) => (
    <ProductCard
      key={p._id}
      product={p}
      onAdd={() => addToCart(p)}
    />
  ))}
</div>

      {destacados.length === 0 && (
        <p>No hay productos destacados para mostrar.</p>
      )}
    </section>
  );
}
