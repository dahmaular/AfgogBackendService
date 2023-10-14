const _ = require("lodash");
const { validate } = require("../validations/Cart");
const { Cart } = require("../models/Cart");

let data;
let message;

exports.addToCart = async (req, res) => {
  const { product } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  let cart = await Cart.findOne({ product });
  if (cart)
    return res
      .status(400)
      .send({ message: "Item already in cart.", isSuccess: false });

  try {
    cart = new Cart(_.pick(req.body, ["product", "amount", "count", "userId"]));
    await cart.save();

    message = "Item added to cart successfully";
    data = cart;
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getCartItems = async (req, res) => {
  const cart = await Cart.find();
  try {
    data = cart;
    message = "Cart fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getCartByUserId = async (id, res) => {
  try {
    const cart = await Cart.find({ userId: id });
    data = cart;
    message = "Cart fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};
