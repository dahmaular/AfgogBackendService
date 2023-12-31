const { PaymentCard } = require("../models/PaymentCards");
const { validate } = require("../validations/PaymentCard");
const _ = require("lodash");

let data;
let message;

exports.addPaymentCard = async (req, res) => {
  const { error } = validate(req.body);
  const { type, cardName, cardNumber, expiry, cvv, userId } = req.body;
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let card = new PaymentCard({
      type,
      cardName,
      cardNumber,
      cvv,
      expiry,
      userId
    });
    await card.save();

    data = _.pick(card, [
      "type",
      "cardName",
      "cardNumber",
      "cvv",
      "expiry",
      "userId"
    ]);

    res.json({ data, message: "Successful", isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getPaymentCard = async (req, res) => {
  const card = await PaymentCard.find();

  try {
    data = card;
    message = "Cards fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};

exports.getPaymentCardByUserId = async (id, res) => {
  // const address = await DeliveryAddress.find();

  try {
    const card = await PaymentCard.find({ userId: id }).select('-dateCreated').select('-dateModified');
    data = card;
    message = "Cards fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};