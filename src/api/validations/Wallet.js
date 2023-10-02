const Joi = require("joi");

function validateFundWallet(data) {
  const schema = Joi.object({
    trackingRef: Joi.string().min(3).max(255).required(),
    amount: Joi.string().min(3).max(255).required(),
    narration: Joi.string().min(3).max(255)
  });

  const validation = schema.validate(data);
  return validation;
}

exports.validateFundWallet = validateFundWallet;
