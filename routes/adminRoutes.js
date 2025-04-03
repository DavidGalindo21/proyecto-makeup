import express from "express";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminDashboard
);

export default router;
