const Joi = require("joi");

function appVersion(version) {
  const schema = Joi.object({
    ios: Joi.string().min(1).max(500).required(),
    android: Joi.string().min(1).max(500).required(),
  });

  const validation = schema.validate(version);
  return validation;
}

exports.validate = appVersion;
