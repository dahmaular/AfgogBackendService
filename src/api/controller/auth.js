const bcrypt = require("bcryptjs");
const _ = require("lodash");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("config");

const { validate } = require("../validations/Authentication");
const { Vendor } = require("../models/Vendor");
const { User } = require("../models/User");

let data;
let message;

exports.authentication = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      isSuccess: false,
    });

  let user = await Vendor.findOne({ email });

  if (!user)
    return res
      .status(401)
      .send({ message: "Invalid email or password", isSuccess: false });

  if (user.status != "Active") {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
      isSuccess: false,
    });
  } else {
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res
        .status(400)
        .send({ message: "Invalid email or password", isSuccess: false });

    try {
      const token = user.generateAuthToken();
      const authData = _.pick(user, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "storeName",
        "businessAddress",
        "businessType",
        "bankName",
        "accountNumber",
        "bvn",
      ]);
      message = "User fetched successfully";
      res.json({ authData, token, message, isSuccess: true });
    } catch (error) {
      console.log(error);
      res.json({ isSuccess: false });
    }
  }
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      isSuccess: false,
    });

  let user = await User.findOne({ email });

  if (!user)
    return res
      .status(401)
      .send({ message: "Invalid email or password", isSuccess: false });

  if (user.status != "Active") {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
      isSuccess: false,
    });
  } else {
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res
        .status(400)
        .send({ message: "Invalid email or password", isSuccess: false });

    try {
      const token = user.generateAuthToken();
      const authData = _.pick(user, [
        "_id",
        "fullName",
        "email",
        "phone",
        "isAgent",
        "agencyName",
        "isRealEstate"
      ]);
      message = "User fetched successfully";
      res.json({ authData, token, message, isSuccess: true });
    } catch (error) {
      console.log(error);
      res.json({ isSuccess: false });
    }
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        message: "Email is required",
        isSuccess: false,
      });
    }

    // Check if user exists in User model
    let user = await User.findOne({ email });
    let userType = "user";

    // If not found in User, check Vendor model
    if (!user) {
      user = await Vendor.findOne({ email });
      userType = "vendor";
    }

    if (!user) {
      return res.status(404).send({
        message: "No account found with this email address",
        isSuccess: false,
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry (1 hour from now)
    const resetTokenExpiry = Date.now() + 3600000;

    // Save reset token to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/reset-password/${resetToken}`;

    // Send email
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "your-app-password",
      },
    });

    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your Afgog account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await transport.sendMail({
      from: process.env.EMAIL_USER || "noreply@afgog.com",
      to: user.email,
      subject: "Password Reset Request - Afgog",
      html: message,
    });

    res.status(200).send({
      message: "Password reset email sent successfully",
      isSuccess: true,
    });
  } catch (error) {
    console.log("Forgot Password Error:", error);
    res.status(500).send({
      message: "Error sending password reset email",
      isSuccess: false,
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 5) {
      return res.status(400).send({
        message: "Password must be at least 5 characters long",
        isSuccess: false,
      });
    }

    // Hash the token from URL to match with DB
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    let user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    let userType = "user";

    if (!user) {
      user = await Vendor.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { $gt: Date.now() },
      });
      userType = "vendor";
    }

    if (!user) {
      return res.status(400).send({
        message: "Invalid or expired reset token",
        isSuccess: false,
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).send({
      message: "Password reset successful. You can now login with your new password.",
      isSuccess: true,
      userType,
    });
  } catch (error) {
    console.log("Reset Password Error:", error);
    res.status(500).send({
      message: "Error resetting password",
      isSuccess: false,
      error: error.message,
    });
  }
};
