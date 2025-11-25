import express from "express";
import {
  addUser,
  editUser,
  editUserProfile,
  editUserProfilePassword,
  getUserDetail,
  listUser,
  loginUser,
  registerUser,
  userDetail,
} from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(protect);

router.post("/", addUser);
router.get("/list", listUser);

router.get("/detail", userDetail);

router.route("/:id").get(getUserDetail).put(editUser);

router.route("/change-profile/:id").put(editUserProfile);
router.route("/change-profile-password/:id").put(editUserProfilePassword);

export default router;
