const Joi = require("joi");

function validateUpdate(vendor) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(500).required(),
    lastName: Joi.string().min(3).max(500).required(),
    storeName: Joi.string().min(5).max(255).required(),
    businessAddress: Joi.string().min(5).max(255),
    businessType: Joi.string().min(5).max(255).required(),
    bankName: Joi.string().min(5).max(255),
    accountNumber: Joi.string().min(5).max(255),
  });

  const validation = schema.validate(vendor);
  return validation;
}

exports.validateUpdate = validateUpdate;
