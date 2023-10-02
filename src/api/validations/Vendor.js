const Joi = require("joi");

function validateVendor(vendr) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(500).required(),
    lastName: Joi.string().min(3).max(500).required(),
    email: Joi.string().email().min(3).max(255).required(),
    phone: Joi.string().min(11).max(16).required(),
    password: Joi.string().min(6).max(50).required(),
    storeName: Joi.string().min(5).max(255).required(),
    businessAddress: Joi.string().min(5).max(255),
    businessType: Joi.string().min(5).max(255).required(),
    bankName: Joi.string().min(5).max(255),
    accountNumber: Joi.string().min(5).max(255),
    bvn: Joi.string().min(5).max(255),
  });

  const validation = schema.validate(vendr);
  return validation;
}

exports.validate = validateVendor;
