import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.handler.js";
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzI3NjMzN2QzOTczNjFlNWRhNTYyNyIsImlhdCI6MTczMTQwMDc3NCwiZXhwIjoxNzMxNDAxNjc0fQ.XvYn4MD3kWDxwvr9GNUJt57rUMLb6lYsoS3u20rF__Q
