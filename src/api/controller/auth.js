const bcrypt = require("bcryptjs");
const _ = require("lodash");

const { validate } = require("../validations/Authentication");
const { Vendor } = require("../models/Vendor");

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
      message = "User created successfully";
      res.json({ authData, token, message, isSuccess: true });
    } catch (error) {
      console.log(error);
      res.json({ isSuccess: false });
    }
  }

//   const validatePassword = await bcrypt.compare(password, user.password);
//   if (!validatePassword)
//     return res
//       .status(400)
//       .send({ message: "Invalid email or password", isSuccess: false });

//   try {
//     const token = user.generateAuthToken();
//     const authData = _.pick(user, [
//       "_id",
//       "firstName",
//       "lastName",
//       "email",
//       "phone",
//     ]);
//     res.json({ authData, token, isSuccess: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ isSuccess: false });
//   }
};
