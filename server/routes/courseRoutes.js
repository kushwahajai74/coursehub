import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLectures,
  getCourseLectures,
  getCourses,
} from "../controllers/courseControllers.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

//Get all course without lectures
router.route("/courses").get(getCourses);

//create new-course admin
router
  .route("/courses")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//Add lectures, Delete course ,Get Course Details
router
  .route("/courses/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures) //get course lectures
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

//Delete lectures
router
  .route("/lectures")
  .delete(isAuthenticated, authorizeAdmin, deleteLectures);

export default router;
