import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.use(protect);

router.route("/stat").get(getDashboardStats);

export default router;
