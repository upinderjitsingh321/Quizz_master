const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS,
  },
});
// Verify connection config (optional but useful)
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email config error:", error);
  } else {
    console.log("Email server ready");
  }
});

const SendEmail = async ({to,html,text,subject}) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      html,
      text,
      subject,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { SendEmail };
