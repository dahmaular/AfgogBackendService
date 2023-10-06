const express = require("express");
const {
  addAddress,
  getDeliveryAddress,
  getDeliveryAddressByUserId,
} = require("../controller/delieveryAddress");

const router = express.Router();
const auth = require("../middleware/auth");
const {
  addPaymentCard,
  getPaymentCard,
  getPaymentCardByUserId,
} = require("../controller/paymentCard");

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentCards:
 *       type: object
 *       required:
 *         - id
 *         - cardName
 *         - cardNumber
 *         - expiry
 *         - cvv
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         cardName:
 *           type: string
 *           description: The user first name
 *         cardNumber:
 *           type: string
 *           description: The user phone number
 *         expiry:
 *           type: string
 *           description: The user city
 *         cvv:
 *           type: string
 *           description: The user Address
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         id: string
 *         cardName: string
 *         cardNumber: string
 *         expiry: string
 *         cvv: string
 *         userId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentCardsPost:
 *       type: object
 *       required:
 *         - cardName
 *         - cardNumber
 *         - expiry
 *         - cvv
 *         - userId
 *       properties:
 *         cardName:
 *           type: string
 *           description: The user first name
 *         cardNumber:
 *           type: string
 *           description: The user phone number
 *         expiry:
 *           type: string
 *           description: The user city
 *         cvv:
 *           type: string
 *           description: The user Address
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         cardName: string
 *         cardNumber: string
 *         expiry: string
 *         cvv: string
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
 * /api/payment-cards:
 *   post:
 *     summary: Create a new Payment Card
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCardsPost'
 *     responses:
 *       200:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCardsPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new user
  // winston.info(req.file);
  addPaymentCard(req, res);
});

/**
 * @swagger
 * /api/payment-cards:
 *   get:
 *     summary: Returns the list of all the payment cards
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentCardsPost'
 */
router.get("/", auth, async (req, res) => {
  // get all business types
  getPaymentCard(req, res);
});

/**
 * @swagger
 * /api/payment-cards/{id}:
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
  getPaymentCardByUserId(req.params.id, res);
});

module.exports = router;
