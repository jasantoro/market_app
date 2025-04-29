import { Router } from "express";
import { getUsers, profile, register } from "../controllers/users.controller";

const router = Router();

router.post("/register", register);
router.post("/profile", profile);
router.get("/users", getUsers);

export default router;
