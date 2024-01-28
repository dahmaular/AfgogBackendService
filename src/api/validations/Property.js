const Joi = require("joi");

function validateProperty(property) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(500).required(),
    address: Joi.string().min(3).max(500).required(),
    type: Joi.string().min(3).max(255).required(),
    categoryId: Joi.string().min(3).max(255),
    condition: Joi.string().min(3).max(255),
    size: Joi.string().min(3).max(255),
    description: Joi.string().min(3).max(1024),
    agentId: Joi.string().min(3).max(1024),
    mainImage: Joi.string().min(3).max(1024).required(),
    images: Joi.array(),
    bedroom: Joi.string().min(1).max(255),
    price: Joi.string().min(1).max(255),
    bathroom: Joi.string().min(1).max(255),
    facilities: Joi.string().min(1).max(255),
    carModel: Joi.string().min(1).max(255),
    carYear: Joi.string().min(1).max(255),
  });

  const validation = schema.validate(property);
  return validation;
}

function validatePropertyApproal(property) {
  const schema = Joi.object({
    approved: Joi.boolean().required(),
  });

  const validation = schema.validate(property);
  return validation;
}

exports.validate = validateProperty;
exports.validateApproval = validatePropertyApproal;
