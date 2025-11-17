import express from "express";
import multer from "multer";
import {
  cloudinaryFileDelete,
  cloudinaryFileUpload,
} from "../controllers/cloudinaryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer().single("file");

router.use(protect);

router
  .route("/")
  .post(upload, cloudinaryFileUpload)
  .delete(cloudinaryFileDelete);

export default router;
