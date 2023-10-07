const { DeliveryAddress } = require("../models/DeliveryAddress");
const { validate } = require("../validations/DeliveryAddress");
const _ = require("lodash");

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

    data = _.pick(deliveryAddress, [
      "address",
      "city",
      "name",
      "phoneNumber",
      "userId",
    ]);

    res.json({ data, message: "Successful", isSuccess: true });
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
  try {
    const address = await DeliveryAddress.find({ userId: id }).select('-dateCreated').select('-dateModified');
    data = address;
    message = "Address fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};
