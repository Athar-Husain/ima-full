import express from "express";
import {
  addLocalBranch,
  getAllLocalBranches,
  getLocalBranch,
  getLocalBranches,
} from "../controllers/localBrController.js";
const router = express.Router();

router.post("/addLocalBranch", addLocalBranch);
router.get("/getAllLocalBranches", getAllLocalBranches);

// router.post("/getLocalBranches", stateProtect, getLocalBranches);
// router.post("/updateLocalBranch", stateProtect, updateLocalBranch);

// router.post("/getLocalBranch", localProtect,getLocalBranch);

export default router;
