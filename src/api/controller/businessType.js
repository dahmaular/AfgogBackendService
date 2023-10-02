const { validate } = require("../validations/BusinessType");
const { BusinessType } = require("../models/BusinessType");

let data;
let message;

exports.addBusinessType = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let type = new BusinessType({
      name: req.body.name,
    });
    await type.save();

    res.json({ type, message: "Successful" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getBusinessType = async (req, res) => {
  const type = await BusinessType.find();

  try {
    data = type;
    message = "Types fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error)
    res.json({ data, error });
  }
}
