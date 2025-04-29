import { v4 as uuidv4 } from "uuid";
import { Order, Product, User } from "../models/model";

export interface Database {
  users: User[];
  products: Product[];
  orders: Order[];
}

export let db: Database = {
  users: [
    {
      id: uuidv4(),
      email: "user@example.com",
      password: "1234",
      name: "Juan",
      role: "cliente",
    },
    {
      id: uuidv4(),
      email: "admin@example.com",
      password: "admin",
      name: "Admin",
      role: "admin",
    },
  ],
  products: [
    { id: uuidv4(), name: "Manzana", type: "fruta", price: 1500.0 },
    { id: uuidv4(), name: "Banana", type: "fruta", price: 1800.0 },
    { id: uuidv4(), name: "Naranja", type: "fruta", price: 1350.0 },
    { id: uuidv4(), name: "Limón", type: "fruta", price: 1250.0 },
    { id: uuidv4(), name: "Papa", type: "verdura", price: 1000.0 },
    { id: uuidv4(), name: "Batata", type: "verdura", price: 1100.0 },
    { id: uuidv4(), name: "Zanahoria", type: "verdura", price: 1200.0 },
  ],
  orders: [],
};
