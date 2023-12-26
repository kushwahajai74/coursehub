import express from "express";
import { contact, courseRequest } from "../controllers/otherController.js";
const router = express.Router();

router.route("/contact").post(contact);
router.route("/requestcourse").post(courseRequest);

export default router;
