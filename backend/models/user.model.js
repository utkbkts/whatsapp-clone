import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    picture: {
      public_id: { type: String },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
      },
    },
    status: {
      type: String,
      default: "Hey there | I am using whatsapp",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [
        6,
        "Please make sure your password is at least 6 characters long",
      ],
      maxlength: [
        128,
        "please make sure your password is not more than 128 characters long",
      ],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const User = mongoose.model("user", userSchema);

export default User;
