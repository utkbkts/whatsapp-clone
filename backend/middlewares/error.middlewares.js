import ErrorHandler from "../utils/error.handler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred.";

  if (process.env.NODE_ENV === "development") {
    console.log(err);
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      message: message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = message;

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message.join(", "), 400);
    }

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again!";
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token has expired. Try Again!";
      error = new ErrorHandler(message, 400);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
