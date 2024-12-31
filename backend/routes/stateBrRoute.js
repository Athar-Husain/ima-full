import express from "express";
const router = express.Router();
// import router from express.Router;
import {
  addStateBranch,
  getAllStateBranches,
} from "../controllers/stateBrController.js";

router.post("/addStateBranch", addStateBranch);
// router.post("/statelogin", statelogin);
// router.get("/statelogout", statelogout);
// router.get("/stateloginstatus", stateloginstatus);

// router.get("/getStateBranch", getStateBranch);
// router.patch("/updateStateBranch", updateStateBranch);

// const router = express.Router();

// auth routes
// router.patch("/changeStatePassword", changePassword);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

// router.patch("/")

// for headquarters routes
// router.get("/getStateBranches", getStateBranches);
router.get("/getAllStateBranches", getAllStateBranches);
// router.get("/getStateBranch/:id", getStateBranchData);

export default router;
