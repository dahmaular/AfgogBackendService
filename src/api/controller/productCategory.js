const { Category } = require("../models/Category");
const { validate } = require("../validations/ProductCategory");

let data;
let message;

exports.addCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let category = new Category({
      name: req.body.name,
    });
    await category.save();

    res.json({ category, message: "Successful" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();

  try {
    data = categories;
    message = "Categories fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};

exports.getCategory = async (id, res) => {
  try {
    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ message: "No user found", isSuccess: false });

    data = category;
    message = "Categories fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};
