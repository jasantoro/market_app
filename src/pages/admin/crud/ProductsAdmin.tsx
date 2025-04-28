import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../models";

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id: string) => {
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Administrar Productos</h2>
        <Link
          to="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Nuevo Producto
        </Link>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price.toFixed(2)}</td>
              <td className="p-2 capitalize">{p.type}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/admin/products/${p.id}/edit`}
                  className="text-blue-600"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsAdmin;
