import express from "express";
import { loginController, registerController } from "../controllers/authController.js";

export const authRoute=express.Router();

authRoute.post("/register",registerController);

authRoute.post("/login",loginController)