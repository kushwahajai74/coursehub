import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorhandler.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new ErrorHandler("Please login to access this resource", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

export const authorizeAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not authorized to access this resourse`,
        403
      )
    );
  next();
});
