const { State } = require("../models/State");
const { validate } = require("../validations/State");

let data;
let message;

exports.addState = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    // Check if state already exists
    const existingState = await State.findOne({ 
      $or: [{ name: req.body.name }, { code: req.body.code }] 
    });
    
    if (existingState) {
      return res.status(400).json({ 
        message: "State with this name or code already exists", 
        isSuccess: false 
      });
    }

    let state = new State({
      name: req.body.name,
      code: req.body.code
    });
    
    await state.save();

    res.json({ data: state, message: "State created successfully", isSuccess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.getStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    
    data = states;
    message = "States fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.getState = async (id, res) => {
  try {
    const state = await State.findById(id);
    
    if (!state)
      return res
        .status(404)
        .json({ message: "State not found", isSuccess: false });

    data = state;
    message = "State fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.updateState = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, isSuccess: false });

  try {
    const state = await State.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        code: req.body.code
      },
      { new: true }
    );

    if (!state)
      return res
        .status(404)
        .json({ message: "State not found", isSuccess: false });

    res.json({ data: state, message: "State updated successfully", isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);

    if (!state)
      return res
        .status(404)
        .json({ message: "State not found", isSuccess: false });

    res.json({ message: "State deleted successfully", isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message, isSuccess: false });
  }
};
