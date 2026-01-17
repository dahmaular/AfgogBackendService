const { LGA } = require("../models/LGA");
const { validate } = require("../validations/LGA");
const mongoose = require("mongoose");

let data;
let message;

exports.addLGA = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    // Check if LGA already exists in this state
    const existingLGA = await LGA.findOne({ 
      name: req.body.name,
      state: req.body.stateId
    });
    
    if (existingLGA) {
      return res.status(400).json({ 
        message: "LGA already exists in this state", 
        isSuccess: false 
      });
    }

    let lga = new LGA({
      name: req.body.name,
      state: req.body.stateId
    });
    
    await lga.save();
    await lga.populate('state');

    res.json({ data: lga, message: "LGA created successfully", isSuccess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.getLGAs = async (req, res) => {
  try {
    const { stateId } = req.query;
    
    let query = {};
    if (stateId) {
      if (!mongoose.Types.ObjectId.isValid(stateId)) {
        return res.status(400).json({ 
          message: "Invalid state ID format", 
          isSuccess: false 
        });
      }
      query.state = stateId;
    }
    
    const lgas = await LGA.find(query).populate('state').sort({ name: 1 });
    
    data = lgas;
    message = "LGAs fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.getLGA = async (id, res) => {
  try {
    const lga = await LGA.findById(id).populate('state');
    
    if (!lga)
      return res
        .status(404)
        .json({ message: "LGA not found", isSuccess: false });

    data = lga;
    message = "LGA fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.updateLGA = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    const lga = await LGA.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        state: req.body.stateId
      },
      { new: true }
    ).populate('state');

    if (!lga)
      return res
        .status(404)
        .json({ message: "LGA not found", isSuccess: false });

    res.json({ data: lga, message: "LGA updated successfully", isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.deleteLGA = async (req, res) => {
  try {
    const lga = await LGA.findByIdAndDelete(req.params.id);

    if (!lga)
      return res
        .status(404)
        .json({ message: "LGA not found", isSuccess: false });

    res.json({ message: "LGA deleted successfully", isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};
