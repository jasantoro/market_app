import { Request, Response } from "express";
import { db } from "../db/db";

export const getMetrics = (req: Request, res: Response) => {
  const from = req.query.from ? new Date(req.query.from as string) : null;
  const to = req.query.to ? new Date(req.query.to as string) : null;

  const filteredOrders = db.orders.filter((o) => {
    const date = new Date(o.date);
    return (!from || date >= from) && (!to || date <= to);
  });

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce(
    (sum, o) => sum + o.cart.reduce((s, i) => s + i.price, 0),
    0
  );

  const productCount: { [productName: string]: number } = {};
  const userStats: { [email: string]: { count: number; total: number } } = {};

  filteredOrders.forEach((order) => {
    order.cart.forEach((item) => {
      productCount[item.name] = (productCount[item.name] || 0) + 1;
    });
    const email = order.user.email;
    if (!userStats[email]) {
      userStats[email] = { count: 0, total: 0 };
    }
    userStats[email].count += 1;
    userStats[email].total += order.cart.reduce((s, i) => s + i.price, 0);
  });

  const topProducts = Object.entries(productCount).map(([name, count]) => ({
    name,
    count,
  }));
  const topBuyers = Object.entries(userStats).map(([email, stat]) => ({
    email,
    ...stat,
  }));

  res.json({ totalOrders, totalRevenue, topProducts, topBuyers });
};
