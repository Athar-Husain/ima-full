import express from "express";
import {
  getAllMembers,
  getAppliedMembers,
  getMemberData,
  registerMember,
} from "../controllers/memberController.js";
const router = express.Router();

router.post("/registerMember", registerMember);
router.get("/getAllMembers", getAllMembers);
router.get("/getAppliedMembers", getAppliedMembers);
router.get("/getMemberData/:id", getMemberData);

export default router;
