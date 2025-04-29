import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../models/model";
import { db } from "../db/db";

export const createOrder = (req: Request, res: Response) => {
  const { user, cart } = req.body;
  const newOrder: Order = {
    id: uuidv4(),
    user,
    cart,
    date: new Date().toISOString(),
    completed: false,
  };
  db.orders.push(newOrder);
  res.json({ success: true, orderId: newOrder.id });
};

export const getOrders = (req: Request, res: Response) => {
  res.json(db.orders);
};

export const markOrderAsCompleted = (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = db.orders.find((o) => o.id === orderId);
  if (order) {
    order.completed = true;
    res.json({ success: true });
  } else {
    res.status(404).json({ message: "Pedido no encontrado" });
  }
};
