import React, { useEffect, useState } from "react";
import { Order, User } from "../../models";

interface OrdersProps {
  user: User | null;
}

const Orders: React.FC<OrdersProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetch("http://localhost:4000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);

  const markCompleted = (id: string) => {
    fetch(`http://localhost:4000/api/orders/${id}/complete`, {
      method: "POST",
    }).then(() => {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, completed: true } : order
        )
      );
    });
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Acceso restringido al administrador
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      </div>
      {orders.map((order, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow mb-4 border">
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Usuario:</strong> {order.user.email}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p>
            <strong>Completado:</strong> {order.completed ? "✅" : "❌"}
          </p>
          <ul className="list-disc pl-6">
            {order.cart.map((item, i) => (
              <li key={i}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          {!order.completed && (
            <button
              onClick={() => markCompleted(order.id)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Marcar como completado
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Orders;
