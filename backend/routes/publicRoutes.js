import express from "express";

import { contactFormSubmission } from "../controllers/publicController.js";

const router = express.Router();

router.route("/contact").post(contactFormSubmission);

export default router;
