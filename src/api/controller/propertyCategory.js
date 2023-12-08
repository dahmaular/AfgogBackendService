const { PropCategory} = require("../models/PropertyCategory")
const { validate } = require("../validations/ProductCategory");

let data;
let message;

exports.addPropCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let category = new PropCategory({
      name: req.body.name,
    });
    await category.save();

    res.json({ category, message: "Successful" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getPropCategories = async (req, res) => {
  const categories = await PropCategory.find();

  try {
    data = categories;
    message = "Categories fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};

exports.getPropCategory = async (id, res) => {
  try {
    const category = await PropCategory.findById(id);
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
