const express = require("express");
const {
  addProductBrand,
  getProductBrands,
} = require("../controller/productBrand");
const router = express.Router();

const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductBrand:
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
 *     ProductBrandPost:
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
 * /api/product-brand:
 *   post:
 *     summary: Create a new business type
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBrandPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductBrandPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new user
  // winston.info(req.file);
  addProductBrand(req, res);
});

/**
 * @swagger
 * /api/product-brand:
 *   get:
 *     summary: Returns the list of all the business types
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductBrand'
 */
router.get("/", auth, async (req, res) => {
  // get all business types
  getProductBrands(req, res);
});

module.exports = router;
