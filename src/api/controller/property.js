const _ = require("lodash");
const { Property } = require("../models/Property");
const { validate, validateApproval } = require("../validations/Property");
// must be used to avoid bug

let data;
let message;

exports.createProperty = async (req, res) => {
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  //   let property = await Property;
  //   if (product)
  //     return res
  //       .status(400)
  //       .send({ message: "Product already exists.", isSuccess: false });

  try {
    let property = new Property(
      _.pick(req.body, [
        "title",
        "categoryId",
        "address",
        "description",
        "condition",
        "images",
        "mainImage",
        "agentId",
        "price",
        "bedroom",
        "bathroom",
        "size",
        "facilities",
        "type",
        "carModel",
        "carYear",
      ])
    );
    await property.save();
    message = "Property saved successfully";
    res.json({ property, message, isSuccess: true });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getProperties = async (req, res) => {
  const property = await Property.find();

  try {
    data = property;
    message = "Properties fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    res.json({ data, error });
  }
};

exports.getProperty = async (id, res) => {
  try {
    const property = await Property.findById(id);
    if (!property)
      return res
        .status(404)
        .json({ message: "No property found", isSuccess: false });

    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};

exports.updateProperty = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        categoryId: req.body.categoryId,
        agentId: req.body.agentId,
        description: req.body.description,
        address: req.body.address,
        mainImage: req.body.mainImage,
        images: req.body.images,
        type: req.body.type,
        price: req.body.price,
        condition: req.body.condition,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        facilities: req.body.facilities,
        carModel: req.body.carModel,
        carYear: req.body.carYear,
      },
      {
        new: true,
      }
    );
    if (!property)
      return res.status(404).send({
        message: "No property with the given id found.",
        isSuccess: false,
      });
    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};

exports.approveProperty = async (req, res) => {
  const { error } = validateApproval(req.body);
  if (error)
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });

  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      },
      {
        new: true,
      }
    );
    if (!property)
      return res.status(404).send({
        message: "No property with the given id found.",
        isSuccess: false,
      });
    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    message = error.message;
    res.json({ data, message, isSuccess: false });
  }
};
