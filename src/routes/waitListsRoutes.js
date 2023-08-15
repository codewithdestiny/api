import express from "express";
import WaitListModel from "../models/WaitListModel.js";
import {
  getWaitLists,
  getSingleWaitList,
  createWaitList,
  updateWaitList,
  deleteWaitList,
} from "./../controllers/waitListsController.js";

import { authenticate, authorize } from "./../middlewares/authMiddleware.js";

import advancedResults from "./../middlewares/advancedResults.js";

const router = express.Router();

router.get("/", advancedResults(WaitListModel), getWaitLists);
router.post("/", createWaitList);
router.get("/:id", getSingleWaitList);
router.put("/:id", authenticate, authorize("admin"), updateWaitList);
router.delete("/:id", authenticate, authorize("admin"), deleteWaitList);

export default router;
