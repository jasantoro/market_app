import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Importar routers
import userRoutes from "./routes/users.routes";
import productRoutes from "./routes/products.routes";
import orderRoutes from "./routes/orders.routes";
import metricsRoutes from "./routes/metrics.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", metricsRoutes);

export default app;
