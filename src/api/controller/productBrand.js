const { Brand } = require("../models/Brand");
const { validate } = require("../validations/ProductBrand");

let data;
let message;

exports.addProductBrand = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let brand = new Brand({
      name: req.body.name,
    });
    await brand.save();

    res.json({ brand, message: "Successful" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getProductBrands = async (req, res) => {
  const brand = await Brand.find();

  try {
    data = brand;
    message = "Brand fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error)
    res.json({ data, error });
  }
}
