const nodemailer = require("nodemailer");
const emailSender = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "noworries084@gmail.com",
      pass: "xjuiolgltbabspcf",
    },
  });

  let info = await transporter.sendMail({
    from: "noworries084@gmail.com",
    to: email, // list of receivers
    subject: "No-Worries One Time Pin", // Subject line
    text: otp, // plain text body
  });

  console.log("Message sent:", info.messageId);
};

module.exports = emailSender;
