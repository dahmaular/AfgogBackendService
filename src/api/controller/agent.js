require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validate } = require("../validations/User");
const { validateUpdate } = require("../validations/UserUpdate");
const { validateEmailVerification } = require("../validations/VerifyEmail");

let data;
let message;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.createUser = async (req, res) => {
  const { email, phone } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  let user = await User.findOne({ email });
  let phoneNumber = await User.findOne({ phone });
  if (user || phoneNumber)
    return res
      .status(400)
      .send({ message: "Account already exists.", isSuccess: false });

  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let confirmationCode = "";
  for (let i = 0; i < 4; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }

  user = new User(_.pick(req.body, ["fullName", "email", "phone", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.confirmationCode = confirmationCode;
  await user.save();

  try {
    const token = user.generateAuthToken();
    data = _.pick(user, ["_id", "fullName", "email", "phone"]);
    message = "User created successfully";
    res.json({ data, token, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Email Verification",
    text: `Your verification code is: ${confirmationCode}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        message: "Error sending verification email",
        isSuccess: false,
      });
    } else {
      console.log("Verification email sent: " + info.response);
      res.status(200).send("Verification email sent");
    }
  });
};

exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  const { error } = validateEmailVerification(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  let user = await User.findOne({ email });
  console.log("UserConfig", user.confirmationCode === code);

  if (!user)
    return res.status(404).json({ message: "No user found", isSuccess: false });

  const filter = { email: `${req.body.email}` };
  const update = { status: "Active" };
  if (user.confirmationCode === code && user.status === "Pending") {
    try {
      user = await User.findOneAndUpdate(filter, update, {
        new: true,
      })
        .select("-password")
        .select("-confirmationCode");
      data = user;
      message = "successfull";
      res.json({ data, message, isSuccess: true });
    } catch (error) {
      message = error.message;
      res.json({ data, message, isSuccess: false });
    }
  } else {
    message = "Incorrect code or status";
    res.json({ message, isSuccess: false });
  }
};

exports.getAllUsers = async (res, req) => {
  const user = await User.find().sort("fullName").select("-password");
  try {
    data = user;
    message = "Users fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getUser = async (id, res) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ message: "No user found", isSuccess: false });

    data = user;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { fullName, phone } = req.body;
  const { error } = validateUpdate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        phone
      },
      {
        new: true,
      }
    );
    if (!user)
      return res.status(404).send({
        message: "No user with the given id found.",
        isSuccess: false,
      });
    data = _.pick(user, ["_id", "fullName", "email", "phone"]);
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
