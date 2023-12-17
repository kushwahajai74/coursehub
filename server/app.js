import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import ErrorMiddleWare from "./middlewares/Error.js";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing routes
import coursesRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1", coursesRoutes);
app.use("/api/v1", userRoutes);

export default app;

app.use(ErrorMiddleWare);
