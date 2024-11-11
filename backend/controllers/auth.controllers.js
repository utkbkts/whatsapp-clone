import catchAsyncError from "../middlewares/catch.middleware.js";

const register = catchAsyncError(async (req, res) => {});

const login = catchAsyncError(async (req, res) => {});

const logout = catchAsyncError(async (req, res) => {});

const me = catchAsyncError(async (req, res) => {});

export default { register, login, logout, me };
