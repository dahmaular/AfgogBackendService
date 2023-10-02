const Joi = require("joi");

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
  });

  const validation = schema.validate(category);
  return validation;
}

exports.validate = validateCategory;
