const otpGenerator = require("otp-generator");
const User = require("../user/user.model");
const axios = require("axios");
const emailSender = require("../../config/email");

const {
  createOtpToken,
  verifyOtpToken,
  createToken,
} = require("../../utilities/jwt");

function generateOtp() {
  return otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

const smsApi = async (phoneNumber, message) => {
  await axios
    .get(
      `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${phoneNumber}&from=no-worries&sms=${message}`
    )
    .then((response) => {
      console.log(response.data);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const generatedOtp = generateOtp();
    const tokenizedOtp = createOtpToken(generatedOtp);
    const userExits = await User.findOne({ phoneNumber });
    if (!userExits) {
      await User.create({ phoneNumber, otp: tokenizedOtp });
      const smsSent = smsApi(phoneNumber, `Your OTP is ${generatedOtp} `);
      if (smsSent) {
        return res.status(200).send("Otp sent");
      }
      return res.status(500).send("Otp was not sent");
    }
    if (userExits) {
      await userExits.updateOne({ otp: tokenizedOtp });
      const smsSent = smsApi(phoneNumber, `Your OTP is ${generatedOtp} `);
      if (smsSent) {
        return res.status(200).send("Otp sent");
      }
      return res.status(500).send("Otp was not sent");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Otp was not sent");
  }
};

const sendOtpEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const generatedOtp = generateOtp();
    const tokenizedOtp = createOtpToken(generatedOtp);
    const userExits = await User.findOne({ email });
    if (!userExits) {
      await User.create({ email, otp: tokenizedOtp });
      emailSender(email, `Your OTP is ${generatedOtp}`)
        .then(() => res.status(200).send("Otp sent"))
        .catch(() => res.status(500).send("Otp was not sent"));
    }
    if (userExits) {
      await userExits.updateOne({ otp: tokenizedOtp });
      emailSender(email, `Your OTP is ${generatedOtp}`)
        .then(() => res.status(200).send("Otp sent"))
        .catch(() => res.status(500).send("Otp was not sent"));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Otp was not sent");
  }
};

const login = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const userOtp = user.otp;
    const isOtpValid = verifyOtpToken(otp, userOtp);
    if (!isOtpValid) {
      return res.status(401).send("Invalid OTP");
    }
    const userId = user._id.toString();
    const token = createToken(userId);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Login failed");
  }
};

const loginEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const userOtp = user.otp;
    const isOtpValid = verifyOtpToken(otp, userOtp);
    if (!isOtpValid) {
      return res.status(401).send("Invalid OTP");
    }
    const userId = user._id.toString();
    const token = createToken(userId);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Login failed");
  }
};

module.exports = {
  sendOtp,
  login,
  sendOtpEmail,
  loginEmail,
};
