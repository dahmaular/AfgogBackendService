const Joi = require("joi");

function validateBrand(brand) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(brand);
  return validation;
}

exports.validate = validateBrand;
