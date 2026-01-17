const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { State } = require("../models/State");
const { LGA } = require("../models/LGA");

const nigeriaData = require("../../config/nigeriaStatesLGAs");

router.post("/", auth, async (req, res) => {
  try {
    // Check if data already exists
    const existingStates = await State.countDocuments();
    if (existingStates > 0) {
      return res.status(400).json({
        message: "Database already seeded. States already exist.",
        isSuccess: false,
        stateCount: existingStates
      });
    }

    // Insert states and LGAs
    let totalLGAs = 0;
    for (const stateData of nigeriaData) {
      const state = new State({
        name: stateData.name,
        code: stateData.code
      });
      await state.save();

      const lgaPromises = stateData.lgas.map(lgaName => {
        const lga = new LGA({
          name: lgaName,
          state: state._id
        });
        return lga.save();
      });

      await Promise.all(lgaPromises);
      totalLGAs += stateData.lgas.length;
    }

    const stateCount = await State.countDocuments();
    const lgaCount = await LGA.countDocuments();

    res.json({
      message: "Database seeded successfully",
      isSuccess: true,
      stateCount,
      lgaCount
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({
      message: "Error seeding database",
      error: error.message,
      isSuccess: false
    });
  }
});

module.exports = router;
