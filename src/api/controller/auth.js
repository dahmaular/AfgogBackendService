const bcrypt = require("bcryptjs");
const _ = require("lodash");

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
      ]);
      message = "User fetched successfully";
      res.json({ authData, token, message, isSuccess: true });
    } catch (error) {
      console.log(error);
      res.json({ isSuccess: false });
    }
  }


};
