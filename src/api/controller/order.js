const _ = require("lodash");
const { validate } = require("../validations/Orders");
const { Order } = require("../models/Orders");

let data;
let message;

exports.addOrder = async (req, res) => {
  //   const { productId } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  //   let order = await Order.findOne({ product: productId });
  //   if (order)
  //     return res
  //       .status(400)
  //       .send({ message: "Item already in cart.", isSuccess: false });

  try {
    let order = new Order(
      _.pick(req.body, [
        "productId",
        "userId",
        "status",
        "amount",
        "deliveryMode",
        "deliveryAddress",
        "paymentMethod",
        "storeId",
        "transactionId",
        "paymentStatus",
        "unit"
      ])
    );
    await order.save();

    message = "Order made successfully";
    res.json({ order, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getOrders = async (req, res) => {
  const order = await Order.find().populate("productId");
  try {
    data = order;
    message = "Orders fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getOrderById = async (id, res) => {
  try {
    const order = await Order.findById(id).populate("productId");
    if (!order)
      return res
        .status(404)
        .json({ message: "No order found", isSuccess: false });

    data = order;
    message = "Order found successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.meesage;
    res.json({ data, message, isSuccess: false });
  }
};

exports.getOrderByStore = async (id, res) => {
  console.log("store", id);
  //   const { storeId } = req.body;
  try {
    const order = Order.findOne({ storeId: id }).populate("productId");
    data = order;
    message = "Order found successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
