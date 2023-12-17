import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import { sendToken } from "../utils/sendToken.js";

//Register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  //   const file = req.file;
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exists", 409));

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Sample id",
      url: "Sample Url",
    },
  });
  sendToken(res, user, "Registerd Successfully", 201);
});

//Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 409));

  const isMatched = await user.comparePassword(password);
  if (!isMatched)
    return next(new ErrorHandler("Incorrect Email or Password", 409));

  sendToken(res, user, `Welcome back ${user.name}`, 201);
});

//Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

//Get my profile
export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Change password
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findById(req.user._id).select("+password");
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) return next(new ErrorHandler("Incorrect Password", 409));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});
//update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});
//update profile picture

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  // cloudinary: TODO
  return res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

//forget password
//reset password
