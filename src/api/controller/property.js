const _ = require("lodash");
const mongoose = require("mongoose");
const winston = require("winston");
const { Property } = require("../models/Property");
const { validate, validateApproval } = require("../validations/Property");
// must be used to avoid bug

let data;
let message;

exports.createProperty = async (req, res) => {
  winston.info("Create property request received", { 
    agentId: req.body.agentId,
    title: req.body.title,
    state: req.body.state,
    lga: req.body.lga
  });
  
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error) {
    winston.error("Property validation failed", { 
      error: error.details[0].message,
      body: req.body 
    });
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });
  }

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
        "tags",
        "state",
        "lga",
      ])
    );
    await property.save();
    winston.info("Property saved to database", { propertyId: property._id });
    
    await property.populate([{ path: "state" }, { path: "lga" }]);
    winston.info("Property created successfully", { 
      propertyId: property._id,
      title: property.title
    });
    
    message = "Property saved successfully";
    res.json({ property, message, isSuccess: true });
  } catch (error) {
    winston.error("Error creating property", { 
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    res.status(500).json({ 
      message: "Error creating property", 
      error: error.message, 
      isSuccess: false 
    });
  }
};

exports.getProperties = async (req, res) => {
  winston.info("Fetching all properties");
  
  try {
    const property = await Property.find()
      .sort({ dateCreated: -1 })
      .populate("state")
      .populate("lga");

    winston.info("Properties fetched successfully", { count: property.length });
    data = property;
    message = "Properties fetched successfully";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    winston.error("Error fetching properties", { 
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Error fetching properties", 
      error: error.message, 
      isSuccess: false 
    });
  }
};

exports.getProperty = async (id, res) => {
  winston.info("Fetching property by ID", { propertyId: id });
  
  try {
    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      winston.warn("Invalid property ID format", { propertyId: id });
      return res.status(400).json({ 
        message: "Invalid property ID format", 
        isSuccess: false 
      });
    }

    const property = await Property.findById(id)
      .populate("state")
      .populate("lga");
      
    if (!property) {
      winston.warn("Property not found", { propertyId: id });
      return res
        .status(404)
        .json({ message: "No property found", isSuccess: false });
    }

    winston.info("Property fetched successfully", { 
      propertyId: id,
      title: property.title
    });
    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    winston.error("Error fetching property", { 
      propertyId: id,
      error: error.message,
      stack: error.stack
    });
    message = error.message;
    res.status(500).json({ 
      message: "Error fetching property", 
      error: error.message, 
      isSuccess: false 
    });
  }
};

exports.updateProperty = async (req, res) => {
  winston.info("Update property request received", { 
    propertyId: req.params.id,
    updates: Object.keys(req.body)
  });
  
  const { error } = validate(req.body);
  if (error) {
    winston.error("Property update validation failed", { 
      propertyId: req.params.id,
      error: error.details[0].message
    });
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });
  }

  // Validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    winston.warn("Invalid property ID format in update", { propertyId: req.params.id });
    return res.status(400).json({ 
      message: "Invalid property ID format", 
      isSuccess: false 
    });
  }

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
        tags: req.body.tags,
        state: req.body.state,
        lga: req.body.lga,
      },
      {
        new: true,
      }
    )
    .populate("state")
    .populate("lga");
    
    if (!property) {
      winston.warn("Property not found for update", { propertyId: req.params.id });
      return res.status(404).send({
        message: "No property with the given id found.",
        isSuccess: false,
      });
    }
    
    winston.info("Property updated successfully", { 
      propertyId: req.params.id,
      title: property.title
    });
    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    winston.error("Error updating property", { 
      propertyId: req.params.id,
      error: error.message,
      stack: error.stack
    });
    message = error.message;
    res.status(500).json({ 
      message: "Error updating property", 
      error: error.message, 
      isSuccess: false 
    });
  }
};

exports.approveProperty = async (req, res) => {
  winston.info("Approve property request received", { 
    propertyId: req.params.id,
    approved: req.body.approved
  });
  
  const { error } = validateApproval(req.body);
  if (error) {
    winston.error("Property approval validation failed", { 
      propertyId: req.params.id,
      error: error.details[0].message
    });
    return res
      .status(400)
      .send({ meesage: error.details[0].message, isSuccess: false });
  }

  // Validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    winston.warn("Invalid property ID format in approval", { propertyId: req.params.id });
    return res.status(400).json({ 
      message: "Invalid property ID format", 
      isSuccess: false 
    });
  }

  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      },
      {
        new: true,
      }
    )
    .populate("state")
    .populate("lga");
    
    if (!property) {
      winston.warn("Property not found for approval", { propertyId: req.params.id });
      return res.status(404).send({
        message: "No property with the given id found.",
        isSuccess: false,
      });
    }
    
    winston.info("Property approved successfully", { 
      propertyId: req.params.id,
      title: property.title
    });
    data = property;
    message = "successfull";
    res.json({ data, message, isSuccess: true });
  } catch (error) {
    winston.error("Error approving property", { 
      propertyId: req.params.id,
      error: error.message,
      stack: error.stack
    });
    message = error.message;
    res.status(500).json({ 
      message: "Error approving property", 
      error: error.message, 
      isSuccess: false 
    });
  }
};
