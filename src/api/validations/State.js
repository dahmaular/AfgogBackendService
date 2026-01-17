const Joi = require("joi");

function validateState(state) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    code: Joi.string().min(2).max(10).required().uppercase()
  });

  return schema.validate(state);
}

exports.validate = validateState;
