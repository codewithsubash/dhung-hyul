import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  getEventById,
  listEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.use(protect);

router.route("/create").post(createEvent);
router.route("/list").get(listEvent);
router.route("/:id").get(getEventById).put(updateEvent);

export default router;
