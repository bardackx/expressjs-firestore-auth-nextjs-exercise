import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import { corsMiddleware } from "./middlewares/corsMiddleware";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(corsMiddleware("*"));

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRoutes);

app.get("/health", (req, res) => {
  res.send("API is running");
});

export default app;
