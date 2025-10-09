const _ = require("lodash");
const { validate } = require("../validations/AppVersion");
const { AppVersion } = require("../models/VersionUpdate");

let data;
let message;

exports.addAppVersion = async (req, res) => {
    console.log("here", req.body);
  const { error } = validate(req.body);
  const { ios, android } = req.body;
  console.log("here", req.body);
  if (error)
    return res.status(400).send({
      meesage: error.details[0].message,
      isSuccess: false,
      value: null,
      responseCode: "999",
    });

  try {
    let version = new AppVersion({
      ios,
      android,
    });
    await version.save();

    // data = _.pick(version, ["ios", "android"]);

    res.json({
      value: version,
      message: "Successful",
      isSuccess: true,
      error: null,
      responseCode: "000",
      responseDescription: "Successful",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getAppVersion = async (req, res) => {
  const version = await AppVersion.find();

  try {
    data = version;
    message = "version fetched successfully";
    res.json({
      value: data,
      message: "Successful",
      isSuccess: true,
      error: null,
      responseCode: "000",
      responseDescription: "Successful",
    });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};

exports.updateAppVersion = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    const version = await AppVersion.findByIdAndUpdate(
      '6690216a84421781754f5246',
      {
        ios: req.body.ios,
        android: req.body.android,
      },
      {
        new: true,
      }
    );
    if (!version)
      return res.status(404).send({
        message: "No versin found.",
        isSuccess: false,
        responseCode: "999",
      });
    data = version;
    message = "successfull";
    res.json({
      value: data,
      message: "Successful",
      isSuccess: true,
      error: null,
      responseCode: "000",
      responseDescription: "Successful",
    });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
