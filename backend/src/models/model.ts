// Interfaces para tipado
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "cliente" | "admin"; // Uso de literal types
}

export interface Address {}

export interface Branch {
  id: string;
  address: Address;
}

export interface Business {
  id: string;
  name: string;
  branches: Branch[];
  type: "restaurant" | "greengrocery";
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
