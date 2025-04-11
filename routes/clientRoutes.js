import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { clientDashboard,productDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, clientDashboard);

router.get('/product',authMiddleware, productDashboard );
     
export default router;
