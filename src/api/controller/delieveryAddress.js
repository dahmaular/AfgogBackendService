const { DeliveryAddress } = require("../models/DeliveryAddress");
const { validate } = require("../validations/DeliveryAddress");

let data;
let message;

exports.addAddress = async (req, res) => {
  const { error } = validate(req.body);
  const { name, phoneNumber, city, address, userId } = req.body;
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let deliveryAddress = new DeliveryAddress({
      address,
      city,
      name,
      phoneNumber,
      userId,
    });
    await deliveryAddress.save();

    res.json({ deliveryAddress, message: "Successful" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getDeliveryAddress = async (req, res) => {
  const address = await DeliveryAddress.find();

  try {
    data = address;
    message = "Address fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};

exports.getDeliveryAddressByUserId = async (id, res) => {
  // const address = await DeliveryAddress.find();

  try {
    const address = await DeliveryAddress.findOne({ userId: id });
    data = address;
    message = "Address fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};
