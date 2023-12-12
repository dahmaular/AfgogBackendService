const Joi = require("joi");

function validateProperty(property) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(500).required(),
    address: Joi.string().min(3).max(500).required(),
    type: Joi.string().min(3).max(255),
    categoryId: Joi.string().min(3).max(255),
    condition: Joi.string().min(3).max(255),
    size: Joi.string().min(3).max(255),
    description: Joi.string().min(3).max(1024),
    agentId: Joi.string().min(3).max(1024),
    images: Joi.array(),
    bedroom: Joi.string().min(1).max(255),
    price: Joi.string().min(1).max(255),
    bathroom: Joi.string().min(1).max(255),
    facilities: Joi.string().min(1).max(255),
  });

  const validation = schema.validate(property);
  return validation;
}

exports.validate = validateProperty;
