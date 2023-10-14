const Joi = require("joi");

function validateCart(cart) {
  const schema = Joi.object({
    product: Joi.string().min(3).max(500).required(),
    amount: Joi.string().min(3).max(500).required(),
    count: Joi.number().required(),
    userId: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(cart);
  return validation;
}

exports.validate = validateCart;
