const express = require("express");
const { addToCart, getCartItems, getCartByUserId } = require("../controller/cart");
const router = express.Router();

const auth = require("../middleware/auth");

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
 *         - userId
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
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         id: string
 *         product: string
 *         amount: string
 *         count: string
 *         userId: string
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
 *         - userId
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
 *         userId:
 *           type: string
 *           description: The user id
 *       example:
 *         product: string
 *         amount: string
 *         count: string
 *         userId: string
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

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Returns the list of all the items in cart
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
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
router.get("/:id", async (req, res) => {
  // get all users
  getCartByUserId(req.params.id, res);
});

module.exports = router;
