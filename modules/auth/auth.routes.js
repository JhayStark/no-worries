const router = require("express").Router;
const {
  sendOtp,
  login,
  sendOtpEmail,
  loginEmail,
} = require("./auth.controller");

const authRouter = router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/login", login);
authRouter.post("/send-otp-email", sendOtpEmail);
authRouter.post("/login-email", loginEmail);

module.exports = authRouter;
