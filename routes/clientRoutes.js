import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { clientDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, clientDashboard);

export default router;
