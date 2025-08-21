import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import promtRoutes from "./routes/prompt.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URI;

//Middleware...
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://openai-clone-mrx9.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//DB connection code...
try {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected successfully");
} catch (error) {
  console.log(error);
}

//Define Routes...
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/deepseekai", promtRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
