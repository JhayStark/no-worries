const otpGenerator = require("otp-generator");
const User = require("../user/user.model");
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

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const generatedOtp = generateOtp();
    const tokenizedOtp = createOtpToken(generatedOtp);
    const userExits = await User.findOne({ phoneNumber });
    if (!userExits) {
      await User.create({ phoneNumber, otp: tokenizedOtp });
      return res.status(200).json({ generatedOtp });
    }
    if (userExits) {
      await userExits.updateOne({ otp: tokenizedOtp });
      return res.status(200).json({ generatedOtp });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
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
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendOtp,
  login,
};
