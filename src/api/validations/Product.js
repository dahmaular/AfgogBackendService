const Joi = require("joi");

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
    categoryId: Joi.string().min(3).max(500).required(),
    type: Joi.string().min(3).max(255).required(),
    availability: Joi.string().min(3).max(255).required(),
    brandId: Joi.string().min(3).max(255),
    storeId: Joi.string().min(3).max(255),
    description: Joi.string().min(3).max(1024),
    specification: Joi.string().min(3).max(1024),
    image: Joi.array(),
    amount: Joi.string().min(1).max(255),
    price: Joi.string().min(1).max(255),
    rating: Joi.string().min(1).max(255),
    color: Joi.string().min(1).max(255),
    size: Joi.array(),
    noOfItems: Joi.string().min(1),
  });

  const validation = schema.validate(product);
  return validation;
}

exports.validate = validateProduct;
