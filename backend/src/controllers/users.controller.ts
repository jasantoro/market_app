import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/model";
import { db } from "../db/db";

// User Management
export const register = (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email ya registrado" });
  }
  const newUser: User = {
    id: uuidv4(),
    email,
    password,
    name,
    role: "cliente",
  };
  db.users.push(newUser);
  res.json(newUser);
};

export const profile = (req: Request, res: Response) => {
  const { id, email, name } = req.body;
  const user = db.users.find((u) => u.id === id);
  if (user) {
    user.email = email;
    user.name = name;
  } else {
    return res.status(400).json({ message: "User no encontrado" });
  }
  res.json(user);
};

export const getUsers = (req: Request, res: Response) => {
  res.json(db.users);
};
