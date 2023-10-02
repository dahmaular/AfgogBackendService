const Joi = require("joi");

function validatePasswordFields(user) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(3).max(500).required(),
    newPassword: Joi.string().min(3).max(255).required(),
  });

  const validation = schema.validate(user);
  return validation;
}

exports.validatePasswordFields = validatePasswordFields;
