const Joi = require("joi");

function validateUpdate(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(500).required(),
    phone: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(user);
  return validation;
}

exports.validateUpdate = validateUpdate;
