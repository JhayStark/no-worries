const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  try {
    const accessToken = sign({ id: user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating access token");
  }
};

const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer)
    return res.status(401).json({ message: "Authorization header missing" });

  const accessToken = bearer.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({ message: "Access token missing" });

  try {
    const valid = verify(accessToken, process.env.JWT_SECRET);
    if (valid) {
      req.userId = valid.id;
      req.authenticated = true;
      return next();
    } else {
      return res.status(401).json({ message: "Invalid access token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const createOtpToken = (otp) => {
  try {
    const otpToken = sign({ otp }, process.env.JWT_SECRET, {
      expiresIn: 1800,
    });
    return otpToken;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating otp token");
  }
};

const verifyOtpToken = (otp, userOtp) => {
  try {
    const valid = verify(userOtp, process.env.JWT_SECRET);

    if (valid.otp === otp) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { createToken, verifyToken, createOtpToken, verifyOtpToken };
