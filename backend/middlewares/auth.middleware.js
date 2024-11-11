import User from "../models/auth.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catch.middleware.js";
import jwt from "jsonwebtoken";
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { accesstoken } = req.cookies;

  if (!accesstoken) {
    return next(new ErrorHandler("login first to access this resource", 401));
  }
  const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
