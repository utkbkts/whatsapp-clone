import jwt from "jsonwebtoken";
export default (user, statusCode, res) => {
  const access_token = user.getJwtToken();

  const refresh_token = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" } // refresh token 30 gün geçerli
  );

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refreshtoken",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accesstoken", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: process.env.COOKIE_EXPRES_TIME * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    user,
  });
};
