export interface User {
  name: string;
  email: string;
  role: "cliente" | "admin";
}

export interface Product {
  id: string;
  name: string;
  type: "fruta" | "verdura";
  price: number;
}

export interface Order {
  id: string;
  user: User;
  cart: Product[];
  date: string;
  completed: boolean;
}

export interface Metric {
  topProducts: { name: string; count: number }[];
  topBuyers: { email: string; count: number; total: number }[];
  totalOrders: number;
  totalRevenue: number;
}
