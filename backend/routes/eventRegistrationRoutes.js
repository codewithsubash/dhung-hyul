import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  createEventRegistration,
  deleteRegisterUser,
  listEventRegistration,
} from "../controllers/eventRegistrationController.js";

const router = express.Router();

router.use(protect);

router.route("/create").post(createEventRegistration);
router.route("/list").get(listEventRegistration);
router.route("/event/:eventId/user/:userId").delete(deleteRegisterUser);

export default router;
