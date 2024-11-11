import catchAsyncError from "../middlewares/catch.middleware.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/error.handler.js";
import sendToken from "../utils/send.token.js";
import validator from "validator";
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

const login = catchAsyncError(async (req, res, next) => {});

const logout = catchAsyncError(async (req, res, next) => {});

const me = catchAsyncError(async (req, res, next) => {});

export default { register, login, logout, me };
