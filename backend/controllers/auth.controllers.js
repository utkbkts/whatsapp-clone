import catchAsyncError from "../middlewares/catch.middleware.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.handler.js";
import sendToken from "../utils/send.token.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { upload_file } from "../utils/cloudinary.js";
const register = catchAsyncError(async (req, res, next) => {
  const { name, email, picture, status, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (
    !validator.isLength(name, {
      min: 3,
      max: 30,
    })
  );

  if (status && status.length > 64) {
    return next(
      new ErrorHandler(
        "Status must be less than or equal to 64 characters",
        400
      )
    );
  }

  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Invalid email", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  let pictureData = "";
  if (picture) {
    try {
      const cloudinaryResponse = await upload_file(picture, "whatsapp");
      pictureData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    } catch (error) {
      return next(new ErrorHandler("Error uploading image to Cloudinary", 500));
    }
  }

  const newUser = await User.create({
    name,
    email,
    picture: pictureData || undefined,
    status,
    password,
  });

  sendToken(newUser, 201, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email ", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 401));
  }
  sendToken(user, 200, res);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Logged out successfully" });
});

const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  return res.status(200).json({
    user,
  });
});

const searchUsers = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.user?.toString().trim();
  console.log("🚀 ~ searchUsers ~ keyword:", keyword);

  if (!keyword) {
    return res.status(400).json({ message: "Lütfen bir arama terimi girin." });
  }

  const regex = new RegExp(keyword, "i");
  const users = await User.find({
    $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
  }).find({
    _id: { $ne: req.user._id },
  });

  return res.status(200).json({
    success: true,
    results: users.length,
    users,
  });
});

export default { register, login, logout, getUser, searchUsers };
