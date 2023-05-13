const router = require("express").Router;
const { sendOtp, login } = require("./auth.controller");

const authRouter = router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/login", login);

module.exports = authRouter;
