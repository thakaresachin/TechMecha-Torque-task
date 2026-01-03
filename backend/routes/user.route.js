import express from "express";
import { Login, Register } from "../controllers/user.controller.js";  

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
});


export default userRouter;
