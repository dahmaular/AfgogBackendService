const { PaymentCard } = require("../models/PaymentCards");
const { validate } = require("../validations/PaymentCard");

let data;
let message;

exports.addPaymentCard = async (req, res) => {
  const { error } = validate(req.body);
  const { cardName, cardNumber, expiry, cvv, userId } = req.body;
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    let card = new PaymentCard({
      cardName,
      cardNumber,
      cvv,
      expiry,
      userId
    });
    await card.save();

    res.json({ card, message: "Successful" });
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
    const card = await PaymentCard.find({ userId: id });
    data = card;
    message = "Cards fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    console.log("error", error);
    res.json({ data, error });
  }
};