const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  approveProperty,
} = require("../controller/property");

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - categoryId
 *         - address
 *         - type
 *         - description
 *         - condition
 *         - images
 *         - mainImage
 *         - agentId
 *         - price
 *         - bedroom
 *         - bathroom
 *         - size
 *         - facilities
 *         - carModel
 *         - carYear
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: The product name
 *         categoryId:
 *           type: string
 *           description: The product category
 *         address:
 *           type: string
 *           description: The product brand
 *         type:
 *           type: string
 *           description: The product type e.g new or used
 *         description:
 *           type: string
 *           description: The product availabilty e.g in Stock or out of stock
 *         condition:
 *           type: string
 *           description: The product description
 *         images:
 *           type: string
 *           description: The product specification
 *         mainImage:
 *           type: string
 *           description: The productamount
 *         price:
 *           type: string
 *           description: The product price
 *         agentId:
 *           type: string
 *           description: The product rating
 *         bedroom:
 *           type: string
 *           description: The product color
 *         size:
 *           type: array
 *           description: The product size
 *         bathroom:
 *           type: string
 *           description: The product rating
 *         facilities:
 *           type: string
 *           description: The product rating
 *         carModel:
 *           type: string
 *           description: The product model
 *         carYear:
 *           type: string
 *           description: The product year
 *       example:
 *         id: string
 *         title: string
 *         categoryId: string
 *         address: string
 *         type: string
 *         description: string
 *         condition: string
 *         images: string
 *         mainImage: string
 *         agentId: string
 *         price: string
 *         bedroom: string
 *         bathroom: string
 *         size: string
 *         facilities: string
 *         carModel: string
 *         carYear: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyPost:
 *       type: object
 *       required:
 *         - title
 *         - categoryId
 *         - address
 *         - type
 *         - description
 *         - condition
 *         - images
 *         - mainImage
 *         - agentId
 *         - price
 *         - bedroom
 *         - bathroom
 *         - size
 *         - facilities
 *         - carModel
 *         - carYear
 *       properties:
 *         title:
 *           type: string
 *           description: The product name
 *         categoryId:
 *           type: string
 *           description: The product category
 *         address:
 *           type: string
 *           description: The product brand
 *         type:
 *           type: string
 *           description: The product type e.g new or used
 *         description:
 *           type: string
 *           description: The product availabilty e.g in Stock or out of stock
 *         condition:
 *           type: string
 *           description: The product description
 *         images:
 *           type: string
 *           description: The product specification
 *         mainImage:
 *           type: string
 *           description: The productamount
 *         price:
 *           type: string
 *           description: The product price
 *         agentId:
 *           type: string
 *           description: The product rating
 *         bedroom:
 *           type: string
 *           description: The product color
 *         size:
 *           type: array
 *           description: The product size
 *         bathroom:
 *           type: string
 *           description: The product rating
 *         facilities:
 *           type: string
 *           description: The product rating
 *         carModel:
 *           type: string
 *           description: The product model
 *         carYear:
 *           type: string
 *           description: The product year
 *       example:
 *         title: string
 *         categoryId: string
 *         address: string
 *         type: string
 *         description: string
 *         condition: string
 *         images: string
 *         mainImage: string
 *         agentId: string
 *         price: string
 *         bedroom: string
 *         bathroom: string
 *         size: string
 *         facilities: string
 *         carModel: string
 *         carYear: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyProfile:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         email:
 *           type: string
 *           description: The user email address
 *       example:
 *         fullName: string
 *         email: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyApproval:
 *       type: object
 *       required:
 *         - approved
 *       properties:
 *         approved:
 *           type: boolean
 *           description: The property approval status
 *       example:
 *         approved: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Property
 *   description: The Property managing API
 */

/**
 * @swagger
 * /api/property:
 *   post:
 *     summary: Create a new property
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyPost'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // register new user
  // winston.info(req.file);
  createProperty(req, res);
});

/**
 * @swagger
 * /api/property:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyPost'
 */
router.get("/", async (req, res) => {
  // get all users
  getProperties(req, res);
});

/**
 * @swagger
 * /api/property/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyPost'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", async (req, res) => {
  //get only 1 user
  getProperty(req.params.id, res);
});

/**
 * @swagger
 * /api/property/{id}:
 *  put:
 *    summary: Update the product by id
 *    tags: [Property]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The property id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PropertyPost'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PropertyPost'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
  updateProperty(req, res);
});

/**
 * @swagger
 * /api/approve-property/{id}:
 *  put:
 *    summary: Update the product by id
 *    tags: [Property]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The property id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PropertyApproval'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PropertyApproval'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
  console.log("approve", req)
  approveProperty(req, res);
});

module.exports = router;
