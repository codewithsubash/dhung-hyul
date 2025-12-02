import express from "express";

import {
  contactFormSubmission,
  getBlogBySlug,
  getEventBySlug,
  listBlog,
  listEvent,
} from "../controllers/publicController.js";

const router = express.Router();

router.route("/contact").post(contactFormSubmission);
router.route("/blog-list").get(listBlog);
router.route("/blog/:slug").get(getBlogBySlug);
router.route("/event-list").get(listEvent);
router.route("/event/:slug").get(getEventBySlug);

export default router;
