const _ = require("lodash");
const { Vendor } = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const { validate } = require("../validations/Vendor");
const { validateEmailVerification } = require("../validations/VerifyEmail");
const { validateUpdate } = require("../validations/VendorUpdate");
// const { createVirtualAccount } = require("./wallet");
let data;
let message;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "adedamolagunbiade@gmail.com",
    pass: "qihqnprwbrkomycz",
  },
});

exports.createAccount = async (req, res) => {
  const { email, phone } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  let user = await Vendor.findOne({ email });
  let phoneNumber = await Vendor.findOne({ phone });
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

  user = new Vendor(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "storeName",
      "businessAddress",
      "businessType",
      "bankName",
      "accountNumber",
      "bvn",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.confirmationCode = confirmationCode;
  await user.save();

  try {
    const token = user.generateAuthToken();
    data = _.pick(user, [
      "firstName",
      "lastName",
      "email",
      "phone",
      "_id",
      "storeName",
      "businessAddress",
      "businessType",
      "bankName",
      "accountNumber",
      "bvn",
    ]);
    message = "User created successfully";
    res.json({ data, token, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }

  const mailOptions = {
    from: "adedamolagunbiade@gmail.com",
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

  let user = await Vendor.findOne({ email });
  console.log("UserConfig", user.confirmationCode === code);

  if (!user)
    return res.status(404).json({ message: "No user found", isSuccess: false });

  const filter = { email: `${req.body.email}` };
  const update = { status: "Active" };
  if (user.confirmationCode === code && user.status === "Pending") {
    try {
      user = await Vendor.findOneAndUpdate(filter, update, {
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

exports.getAllVendors = async (res, req) => {
  const user = await Vendor.find().sort("fullName").select("-password");
  try {
    data = user;
    message = "Vendors fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getVendor = async (id, res) => {
  try {
    const user = await Vendor.findById(id).select("-password");
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

exports.updateVendorProfile = async (req, res) => {
  // const { firstName, email } = req.body;
  const { error } = validateUpdate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    const user = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        storeName: req.body.storeName,
        businessAddress: req.body.businessAddress,
        businessType: req.body.businessType,
        bankName: req.body.bankName,
        accountNumber: req.body.accountNumber,
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
    data = user;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
