import express from "express";
import StaffModel from "../models/StaffModel.js";
import advancedResults from "../middlewares/advancedResults.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

import {
  getAllStaff,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";

// Include other resource routers

const router = express.Router();

router.get("/", advancedResults(StaffModel), getAllStaff);
router.post("/", authenticate, createStaff);
router.get("/:id", authenticate, getStaff);
router.put("/:id", authenticate, updateStaff);
router.delete("/:id", authenticate, deleteStaff);

// Re-route into other resource routers

export default router;
