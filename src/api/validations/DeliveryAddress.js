const Joi = require("joi");

function validateDeliveryAddress(text) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
    phoneNumber: Joi.string().min(3).max(500).required(),
    city: Joi.string().min(3).max(500).required(),
    address: Joi.string().min(3).max(500).required(),
    userId:Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(text);
  return validation;
}

exports.validate = validateDeliveryAddress;
