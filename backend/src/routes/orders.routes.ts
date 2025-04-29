import { Router } from "express";
import {
  createOrder,
  getOrders,
  markOrderAsCompleted,
} from "../controllers/orders.controller";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.post("/:id/complete", markOrderAsCompleted);

export default router;
