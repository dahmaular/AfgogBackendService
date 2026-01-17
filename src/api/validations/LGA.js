const Joi = require("joi");
const Joi_objectid = require("joi-objectid")(Joi);

function validateLGA(lga) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    stateId: Joi_objectid().required()
  });

  return schema.validate(lga);
}

exports.validate = validateLGA;
