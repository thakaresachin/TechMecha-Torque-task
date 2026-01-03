import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectdb from "./config/connectdb.js";
import userRouter from "./routes/user.route.js";
import notesrouter from "./routes/Notes.route.js";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Test Route
app.get("/", (req, res) => {
  res.send("Notes API Running...");
});

// DB
connectdb();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/notes", notesrouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
