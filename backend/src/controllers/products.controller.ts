import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../models/model";
import { db } from "../db/db";

export const getProducts = (req: Request, res: Response) => {
  res.json(db.products);
};

export const getProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = db.products.find((p) => p.id === productId);
  if (!product) {
    return res.status(400).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price, type } = req.body;
  if (db.products.find((p) => p.name === name)) {
    return res.status(400).json({ message: "Ya existe el producto" });
  }
  const newProduct: Product = {
    id: uuidv4(),
    name,
    price,
    type,
  };
  db.products.push(newProduct);
  res.json(newProduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const { name, price, type } = req.body;
  const product = db.products.find((p) => p.id === productId);
  if (product) {
    product.name = name;
    product.price = price;
    product.type = type;
  } else {
    return res.status(400).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const productIndex = db.products.findIndex((p) => p.id !== productId);
  db.products.splice(productIndex, 1);
  res.json();
};
