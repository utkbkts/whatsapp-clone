import catchAsyncError from "../middlewares/catch.middleware.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/error.handler.js";
import sendToken from "../utils/send.token.js";
import validator from "validator";
import jwt from "jsonwebtoken";
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

  const newUser = await User.create({ name, email, picture, status, password });

  sendToken(newUser, 201, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
  return res.status(200).json({ message: "Logged out successfully" });
});

const refreshToken = catchAsyncError(async (req, res, next) => {
  const refresh_token = req.cookies.refreshtoken;

  if (!refresh_token) {
    return next(new ErrorHandler("please login", 401));
  }

  // Refresh token'ı doğrulama
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

  if (!decoded) {
    return next(new ErrorHandler("Invalid refresh token", 401));
  }

  // Kullanıcıyı bulma
  const user = await User.findById(decoded.userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("accesstoken", newAccessToken, { httpOnly: true, secure: true });
  res.status(200).json({ message: "Access token refreshed" });
});

export default { register, login, logout, refreshToken };
