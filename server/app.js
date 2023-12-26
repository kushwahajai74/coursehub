import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import ErrorMiddleWare from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// importing routes
import coursesRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import otherRoutes from "./routes/otherRoutes.js";

app.use("/api/v1", coursesRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", otherRoutes);

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

export default app;

app.use(ErrorMiddleWare);
