const { Inspection } = require("../models/Inspections");
const { validate } = require("../validations/Inspections");

let data;
let message;
let code;

exports.requestInspection = async (req, res) => {
  const { inspectorId, inpectionDate, inspectionTime, propertyId } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  let inspect = await Inspection.findOne({ property: propertyId });
  if (inspect)
    return res.status(400).send({
      message: "You have already requested inspection for this item",
      isSuccess: false,
      responseCode: "99",
    });

  try {
    inspect = new Inspection({
      inpectionDate,
      inspectionTime,
      inspector: inspectorId,
      property: propertyId,
    });

    await inspect.save();

    res.json({ message: "Successful", isSuccess: true, responseCode: "00" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getInspectionDateByUserID = async (id, res) => {
  try {
    const inspect = await Inspection.find({ inspector: id })
      .populate("inspector")
      .populate("property");
    data = inspect;
    message = "successful";
    code = "00";
    res.json({ data, message, isSuccess: true, responseCode: code });
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
};

exports.getInspectionDateByID = async (id, res) => {
  try {
    const inspect = await Inspection.findById(id)
      .populate("inspector")
      .populate("property");

    if (!inspect)
      return res
        .status(404)
        .json({ message: "No inspection found", isSuccess: false });

    data = inspect;
    message = "successful";
    code = "00";
    res.json({ data, message, isSuccess: true, responseCode: code });
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
};

exports.getAllInspections = async (req, res) => {
  const inspect = await Inspection.find()
    .populate("inspector")
    .populate("property");

  try {
    data = inspect;
    message = "Successful";
    code = "00";
    res.json({ data, message, isSuccess: true, responseCode: code });
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
};
