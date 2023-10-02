const Joi = require("joi");

function validateOrder(order) {
  const schema = Joi.object({
    productId: Joi.string().min(3).max(500).required(),
    userId: Joi.string().min(3).max(500).required(),
    status: Joi.string().min(3).max(255),
    amount: Joi.string().min(3).max(500).required(),
    deliveryMode: Joi.string().min(3).max(500).required(),
    deliveryAddress: Joi.string().min(3).max(255),
    storeId: Joi.string().min(3).max(500).required(),
    paymentMethod: Joi.string().min(3).max(500).required(),
    transactionId: Joi.string().min(3).max(500).required(),
    unit: Joi.string().min(3).max(500).required(),
    paymentStatus: Joi.string().min(3).max(255),
  });

  const validation = schema.validate(order);
  return validation;
}

exports.validate = validateOrder;
