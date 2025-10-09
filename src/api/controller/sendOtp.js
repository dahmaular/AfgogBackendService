require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validateEmailVerification } = require("../validations/VerifyEmail");
const { validate } = require("../validations/SendOTP");
const { User } = require("../models/User");
const { Otp } = require("../models/Otp");
const logoImg = "https://firebasestorage.googleapis.com/v0/b/devtagefs.appspot.com/o/logo.png?alt=media&token=43ace15e-46bf-425d-98b4-651fc0961eec";

let data;
let message;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL2,
    pass: process.env.PASSWORD2,
  },
});

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  let user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send({ message: "Email does not exist.", isSuccess: false });

  const characters = "0123456789";
  let otpCode = "";
  for (let i = 0; i < 4; i++) {
    otpCode += characters[Math.floor(Math.random() * characters.length)];
  }

  let otp = new Otp(_.pick(req.body, ["email", "userId"]));

  otp.otp = otpCode;
  await otp.save();

  const mailOptions = {
    from: process.env.EMAIL2,
    to: req.body.email,
    subject: "AFGOG: One Time Password",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img src=${logoImg} alt="AFGOG" /></a>
    </div>
    <p style="font-size:1.1em">Hi ${user.fullName},</p>
    <p>Thank you for choosing AFGOG. Use the following OTP to complete your procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />AFGOG</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>AFGOG</p>
      <p>Lagos</p>
      <p>Nigeria</p>
    </div>
  </div>
</div>
    `,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Error sending verification email",
          isSuccess: false,
        });
      } else {
        console.log("Verification email sent: " + info.response);
        // res.status(200).send("Verification email sent");
        data = {};
        message = "Email sent successfully";
        res.json({ data, message, isSuccess: true });
      }
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;

  const { error } = validateEmailVerification(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  let user = await Otp.findOne({ email });
  // console.log("UserConfig", user.confirmationCode === code);

  if (!user)
    return res.status(404).json({ message: "Not found", isSuccess: false });

  const filter = { email: `${req.body.email}` };
  const update = { status: "Used" };
  if (user.otp === code && user.status === "Pending") {
    try {
      user = await Otp.findOneAndUpdate(filter, update, {
        new: true,
      })
        .select("-status")
        .select("-otp");
      data = {};
      message = "Verified successfully";
      res.json({ data, message, isSuccess: true });
    } catch (error) {
      message = error.message;
      res.json({ data, message, isSuccess: false });
    }
  } else {
    message = "Invalide code";
    res.json({ message, isSuccess: false });
  }
};
