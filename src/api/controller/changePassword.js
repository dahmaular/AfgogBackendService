// const _ = require("lodash");
// const { User } = require("../models/User");
// const bcrypt = require("bcryptjs");

// const { validatePasswordFields } = require("../validations/ChangePassword");
// let data;
// let message;

// exports.changePassword = async (req, res) => {
//   var { oldPassword, newPassword } = req.body;
//   const { error } = validatePasswordFields(req.body);
//   if (error)
//     return res
//       .status(400)
//       .send({ message: error.details[0].message, isSuccess: false });

//   if (oldPassword !== newPassword) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       newPassword = await bcrypt.hash(newPassword, salt);
//       const user = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           password: newPassword,
//         },
//         {
//           new: true,
//         }
//       );
//       if (!user)
//         return res
//           .status(404)
//           .send({
//             message: "No user with the given id found.",
//             isSuccess: false,
//           });
//       message = "Successful";
//       data = user;
//       res.json({ data, message, isSuccess: true });
//     } catch (error) {
//       message = error.message;
//       res.json({ data, message, isSuccess: false });
//     }
//   }
// };
