const Joi = require("joi");

function validateEmailVerification(verify) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(500),
    code: Joi.string().min(3).max(255),
  });

  const validation = schema.validate(verify);
  return validation;
}

exports.validateEmailVerification = validateEmailVerification;
