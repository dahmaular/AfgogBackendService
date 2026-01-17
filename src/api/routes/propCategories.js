const express = require("express");
const { addPropCategory, getPropCategories, getPropCategory } = require("../controller/propertyCategory");
const router = express.Router();

const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyCategory:
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
 *           description: The category name
 *       example:
 *         id: string
 *         name: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyCategoryPost:
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
 *   name: Property
 *   description: The Product managing API
 */

/**
 * @swagger
 * /api/property-category:
 *   post:
 *     summary: Create a new product category
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyCategoryPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyCategoryPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new category
  // winston.info(req.file);
  addPropCategory(req, res);
});

/**
 * @swagger
 * /api/property-category:
 *   get:
 *     summary: Returns the list of all the property category
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyCategory'
 */
router.get("/", async (req, res) => {
  // get all product categories
  getPropCategories(req, res);
});

/**
 * @swagger
 * /api/property-category/{id}:
 *   get:
 *     summary: Returns the list of one product category
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
    getPropCategory(req.params.id, res);
  });

module.exports = router;
