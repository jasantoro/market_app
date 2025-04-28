import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product, User } from "../models";

interface CheckoutProps {
  cart: Product[];
  user: User | null;
  onCheckoutFinished: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  user,
  onCheckoutFinished,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || cart.length === 0) return;

    fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, cart }),
    }).then(() => {
      onCheckoutFinished();
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          ¡Gracias por tu compra!
        </h2>
        <p className="text-gray-700">Tu pedido ha sido procesado con éxito.</p>
      </div>
    </div>
  );
};

export default Checkout;
