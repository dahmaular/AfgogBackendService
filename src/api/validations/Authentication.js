const Joi = require("joi");

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(16).required(),
    password: Joi.string().min(6).max(50).required(),
  });

  const validation = schema.validate(user);
  return validation;
}

exports.validate = validateLogin;
