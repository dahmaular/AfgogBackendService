const express = require("express");
const { addToCart, getCartItems } = require("../controller/cart");
const router = express.Router();

// const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - id
 *         - product
 *         - amount
 *         - count
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the cart
 *         product:
 *           type: string
 *           description: The product name
 *         amount:
 *           type: string
 *           description: The product amount
 *         count:
 *           type: string
 *           description: The count in the cart
 *       example:
 *         id: string
 *         product: string
 *         amount: string
 *         count: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartPost:
 *       type: object
 *       required:
 *         - product
 *         - amount
 *         - count
 *       properties:
 *         product:
 *           type: string
 *           description: The user first name
 *         amount:
 *           type: string
 *           description: The user last name
 *         count:
 *           type: string
 *           description: The user email address
 *       example:
 *         product: string
 *         amount: string
 *         count: string
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Products managing API
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a new item to cart
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // register new user
  // winston.info(req.file);
  addToCart(req, res);
});

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Returns the list of all the items in cart
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartPost'
 */
router.get("/", async (req, res) => {
  // get all users
  getCartItems(req, res);
});

module.exports = router;
