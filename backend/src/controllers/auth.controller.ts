import { Request, Response } from "express";
import { db } from "../db/db";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    res.json({ name: user.name, email: user.email, role: user.role });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};
