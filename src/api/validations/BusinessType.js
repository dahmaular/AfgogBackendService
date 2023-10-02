const Joi = require("joi");

function validateType(type) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(type);
  return validation;
}

exports.validate = validateType;
