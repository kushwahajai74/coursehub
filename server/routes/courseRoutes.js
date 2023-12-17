import express from "express";
import { createCourse, getCourses } from "../controllers/courseControllers.js";
const router = express.Router();

//Get all course without lectures
router.route("/courses").get(getCourses);

//create new-course admin
router.route("/courses").post(createCourse);

//Add lectures, Delete course ,Get Course Details

//Delete Course
export default router;
