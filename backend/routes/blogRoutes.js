import express from "express";
import {
  createBlog,
  getBlogById,
  listBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/create").post(createBlog);
router.route("/list").get(listBlog);
router.route("/:id").get(getBlogById).put(updateBlog);

export default router;
