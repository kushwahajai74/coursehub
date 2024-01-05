import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/courseModel.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorhandler.js";
import cloudinary from "cloudinary";

//get all courses
export const getCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const courses = await Course.find({
    title: { $regex: keyword, $options: "i" },
    category: { $regex: category, $options: "i" },
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

//create course
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const file = req.file;
  if (!file) return next(new ErrorHandler("Please upload a poster", 400));

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "poster",
  });

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Course created successfully",
  });
});
export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Course not found", 404));
  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});
//Add lectures(Max video size 100 MB)
export const addLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const file = req.file;
  if (!file) return next(new ErrorHandler("Please upload a poster", 400));

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "lectures",
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lectures added to course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const { public_id } = course.lectures[i].video;
    await cloudinary.v2.uploader.destroy(public_id, {
      resource_type: "video",
    });
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

export const deleteLectures = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.find(
    (item) => item._id.toString() === lectureId.toString()
  );
  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter(
    (item) => item._id.toString() !== lectureId.toString()
  );

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});
