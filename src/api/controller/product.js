const _ = require("lodash");
const { Product } = require("../models/Product");
const { validate } = require("../validations/Product");
 // must be used to avoid bug

let data;
let message;

exports.createProduct = async (req, res) => {
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  let product = await Product.findOne({ name });
  if (product)
    return res
      .status(400)
      .send({ message: "Product already exists.", isSuccess: false });

  try {
    product = new Product(
      _.pick(req.body, [
        "name",
        "categoryId",
        "brandId",
        "description",
        "specification",
        "image",
        "amount",
        "price",
        "rating",
        "color",
        "size",
        "noOfItems",
        "type",
        "availability"
      ])
    );
    await product.save();
    message = "Product created successfully";
    res.json({ product, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getProducts = async (req, res) => {
  const product = await Product.find();

  try {
    data = product;
    message = "Products fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getProduct = async (id, res) => {
  try {
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: "No product found", isSuccess: false });

    data = product;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        categoryId: req.body.categoryId,
        brandId: req.body.brand,
        description: req.body.description,
        specification: req.body.specification,
        image: req.body.image,
        amount: req.body.amount,
        price: req.body.price,
        rating: req.body.rating,
      },
      {
        new: true,
      }
    );
    if (!product)
      return res.status(404).send({
        message: "No product with the given id found.",
        isSuccess: false,
      });
    data = product;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
