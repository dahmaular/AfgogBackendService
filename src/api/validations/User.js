const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(500).required(),
    email: Joi.string().email().min(3).max(255).required(),
    phone: Joi.string().min(11).max(16).required(),
    password: Joi.string().min(6).max(50).required(),
    isAgent: Joi.boolean(),
    agencyName: Joi.string().min(6).max(50).required(),
  });

  const validation = schema.validate(user);
  return validation;
}

exports.validate = validateUser;
