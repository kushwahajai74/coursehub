import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorpayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();
//Subscribe
router.route("/subscribe").get(isAuthenticated, buySubscription);
router.route("/paymentverification").post(isAuthenticated, paymentVerification);
router.route("/razorpaykey").get(isAuthenticated, getRazorpayKey);
router.route("/cancelsubscription").get(isAuthenticated, cancelSubscription);

export default router;
