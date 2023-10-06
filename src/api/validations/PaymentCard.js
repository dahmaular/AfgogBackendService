const Joi = require("joi");

function validatePaymentCard(payment) {
  const schema = Joi.object({
    cardName: Joi.string().min(3).max(500).required(),
    cardNumber: Joi.string().min(3).max(500).required(),
    expiry: Joi.string().min(3).max(500).required(),
    cvv: Joi.string().min(3).max(500).required(),
    userId: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(payment);
  return validation;
}

exports.validate = validatePaymentCard;
