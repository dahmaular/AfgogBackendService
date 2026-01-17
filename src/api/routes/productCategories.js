const express = require("express");
const { addCategory, getCategories, getCategory } = require("../controller/productCategory");
const router = express.Router();

const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategory:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user first name
 *       example:
 *         id: string
 *         name: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategoryPost:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The user first name
 *       example:
 *         name: string
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Product managing API
 */

/**
 * @swagger
 * /api/product-category:
 *   post:
 *     summary: Create a new product category
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategoryPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategoryPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new category
  // winston.info(req.file);
  addCategory(req, res);
});

/**
 * @swagger
 * /api/product-category:
 *   get:
 *     summary: Returns the list of all the product category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 */
router.get("/", async (req, res) => {
  // get all product categories
  getCategories(req, res);
});

/**
 * @swagger
 * /api/product-category/{id}:
 *   get:
 *     summary: Returns the list of one product category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The list of a product category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 */
router.get("/:id", auth, async (req, res) => {
    // get all product categories
    getCategory(req.params.id, res);
  });

module.exports = router;
