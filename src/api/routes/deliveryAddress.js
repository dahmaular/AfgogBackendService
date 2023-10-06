const express = require("express");
const {
  addAddress,
  getDeliveryAddress,
  getDeliveryAddressByUserId,
} = require("../controller/delieveryAddress");

const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryAddress:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - phoneNumber
 *         - city
 *         - address
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user first name
 *         phoneNumber:
 *           type: string
 *           description: The user phone number
 *         city:
 *           type: string
 *           description: The user city
 *         address:
 *           type: string
 *           description: The user Address
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         id: string
 *         name: string
 *         phoneNumber: string
 *         city: string
 *         address: string
 *         userId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryAddressPost:
 *       type: object
 *       required:
 *         - name
 *         - phoneNumber
 *         - city
 *         - address
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           description: The user first name
 *         phoneNumber:
 *           type: string
 *           description: The user phone number
 *         city:
 *           type: string
 *           description: The user city
 *         address:
 *           type: string
 *           description: The user Address
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         name: string
 *         phoneNumber: string
 *         city: string
 *         address: string
 *         userId: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The vendors managing API
 */

/**
 * @swagger
 * /api/delivery-address:
 *   post:
 *     summary: Create a new delivery Address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryAddressPost'
 *     responses:
 *       200:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddressPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new user
  // winston.info(req.file);
  addAddress(req, res);
});

/**
 * @swagger
 * /api/delivery-address:
 *   get:
 *     summary: Returns the list of all the business types
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeliveryAddressPost'
 */
router.get("/", auth, async (req, res) => {
  // get all business types
  getDeliveryAddress(req, res);
});

/**
 * @swagger
 * /api/delivery-address/{id}:
 *   get:
 *     summary: Get the address by user id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddressPost'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", auth, async (req, res) => {
    // get address of 1 user
    getDeliveryAddressByUserId(req.params.id, res);
  });

module.exports = router;
