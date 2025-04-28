import React, { useEffect, useState } from "react";
import { Product } from "../models";

interface ProductsProps {
  addToCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const fruits = products.filter((p) => p.type === "fruta");
  const vegetables = products.filter((p) => p.type === "verdura");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Frutas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fruits.map((prod) => (
          <div
            key={prod.id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <h3 className="text-lg font-bold">{prod.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ${prod.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(prod)}
              className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-8">Verduras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vegetables.map((prod) => (
          <div
            key={prod.id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <h3 className="text-lg font-bold">{prod.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ${prod.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(prod)}
              className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default Products;
