import express from "express";

import {
  addList,
  detailList,
  editList,
  getListDDL,
  listList,
} from "../controllers/listController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

//To POST added list
router.route("/add").post(addList);

//To GET all list item
router.route("/").get(listList);

router.route("/ddl").get(getListDDL);

//To GET all list item
router.route("/detail/:type").get(detailList);

//To Edit  list item
router.route("/edit/:id").put(editList);

export default router;
