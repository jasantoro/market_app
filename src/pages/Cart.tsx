import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../models";

interface CartProps {
  cart: Product[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Carrito</h2>
      <div className="space-y-2 mb-4">
        {cart.map((item, idx) => (
          <div key={idx} className="border-b pb-2">
            {item.name} - ${item.price.toFixed(2)}
          </div>
        ))}
      </div>
      <p className="font-bold mb-4">Total: ${total.toFixed(2)}</p>
      <button
        onClick={() => navigate("/checkout")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Finalizar compra
      </button>
    </div>
  );
};

export default Cart;
