import express from "express";
import { updateAccountStatus, users } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", users);
router.put("/update-status",updateAccountStatus);

export default router;