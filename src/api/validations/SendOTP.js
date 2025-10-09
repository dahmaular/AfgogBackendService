const Joi = require("joi");

function validateOtp(otp) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(otp);
  return validation;
}

exports.validate = validateOtp;
