import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { blockUser, unblockUser, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);
router.put("/:id/block", protectRoute, blockUser);
router.put("/:id/unblock", protectRoute, unblockUser);

export default router;
