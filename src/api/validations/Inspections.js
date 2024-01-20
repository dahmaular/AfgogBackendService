const Joi = require("joi");

function validateInspection(inspect) {
  const schema = Joi.object({
    inspectorId: Joi.string().min(3).max(500).required(),
    inpectionDate: Joi.string().min(3).max(500),
    inspectionTime: Joi.string().min(3).max(255),
    propertyId: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(inspect);
  return validation;
}

exports.validate = validateInspection;
