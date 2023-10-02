const express = require("express");
const {
  addOrder,
  getOrderById,
  getOrders,
  getOrderByStore,
} = require("../controller/order");
const router = express.Router();

const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - productId
 *         - userId
 *         - storeId
 *         - status
 *         - amount
 *         - deliveryMode
 *         - deliveryAddress
 *         - paymentMethod
 *         - transactionId
 *         - paymentStatus
 *         - unit
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the type
 *         productId:
 *           type: string
 *           description: The product order details
 *         userId:
 *           type: string
 *           description: The user Id
 *         storeId:
 *           type: string
 *           description: The store Id
 *         status:
 *           type: string
 *           description: The order status
 *         amount:
 *           type: string
 *           description: The product order details
 *         deliveryMode:
 *           type: string
 *           description: The user Id
 *         deliveryAddress:
 *           type: string
 *           description: The order status
 *         paymentMethod:
 *           type: string
 *           description: The user Id
 *         transactionId:
 *           type: string
 *           description: The transaction Id
 *         paymentStatus:
 *           type: string
 *           description: The order status
 *         unit:
 *           type: string
 *           description: The order unit/quantity
 *       example:
 *         productId: string
 *         userId: string
 *         storeId: string
 *         status: string
 *         amount: string
 *         deliveryMode: string
 *         deliveryAddress: string
 *         paymentMethod: string
 *         paymentStatus: string
 *         transactionId: string
 *         unit: string
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Order managing API
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  addOrder(req, res);
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", auth, async (req, res) => {
  //get only 1 user
  getOrderById(req.params.id, res);
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", auth, async (req, res) => {
  // get all users
  getOrders(req, res);
});

/**
 * @swagger
 * /api/store-orders/{id}:
 *   get:
 *     summary: Get the order by store
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The store id
 *     responses:
 *       200:
 *         description: The order description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", auth, async (req, res) => {
  // get all orders by store
  console.log("store", req.params.store)
  getOrderByStore(req.params.store, res);
});

module.exports = router;
