import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/courseModel.js";
import ErrorHandler from "../utils/errorhandler.js";

export const getCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please fill all the fields", 400));

  // const file = req.file;
  // if (!file) return next(new ErrorHandler("Please upload a poster", 400));

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    // file,
    poster: {
      public_id: "sample_id",
      url: "sample_url",
    },
  });
  res.status(200).json({
    success: true,
    course,
  });
});
