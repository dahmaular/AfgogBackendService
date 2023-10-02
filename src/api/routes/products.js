const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("../controller/product");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: 'uploads/'})

// const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - categoryId
 *         - brandId
 *         - type
 *         - availability
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The product name
 *         categoryId:
 *           type: string
 *           description: The product category
 *         brandId:
 *           type: string
 *           description: The product brand
 *         type:
 *           type: string
 *           description: The product type e.g new or used
 *         availability:
 *           type: string
 *           description: The product availabilty e.g in Stock or out of stock
 *         description:
 *           type: string
 *           description: The product description
 *         specification:
 *           type: string
 *           description: The product specification
 *         image:
 *           type: string
 *           description: The product image
 *         amount:
 *           type: string
 *           description: The productamount
 *         price:
 *           type: string
 *           description: The product price
 *         rating:
 *           type: string
 *           description: The product rating
 *         color:
 *           type: string
 *           description: The product color
 *         size:
 *           type: array
 *           description: The product size
 *         noOfItems:
 *           type: string
 *           description: The product rating
 *       example:
 *         id: string
 *         name: string
 *         categoryId: string
 *         brandId: string
 *         type: string
 *         availability: string
 *         description: string
 *         specification: string
 *         image: string
 *         amount: string
 *         price: string
 *         rating: string
 *         color: string
 *         size: []
 *         noOfItems: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductPost:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *         - brandId
 *         - storeId
 *         - type
 *         - availability
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         categoryId:
 *           type: string
 *           description: The product category
 *         brandId:
 *           type: string
 *           description: The product brand
 *         type:
 *           type: string
 *           description: The product type e.g new or used
 *         availability:
 *           type: string
 *           description: The product availabilty e.g in Stock or out of stock
 *         storeId:
 *           type: string
 *           description: The store Id
 *         description:
 *           type: string
 *           description: The product description
 *         specification:
 *           type: string
 *           description: The product specification
 *         image:
 *           type: string
 *           description: The product image
 *         amount:
 *           type: string
 *           description: The productamount
 *         price:
 *           type: string
 *           description: The product price
 *         rating:
 *           type: string
 *           description: The product rating
 *         color:
 *           type: string
 *           description: The product color
 *         size:
 *           type: array
 *           description: The product size
 *         noOfItems:
 *           type: string
 *           description: The product rating
 *       example:
 *         name: string
 *         categoryId: string
 *         brandId: string
 *         type: string
 *         availability: string
 *         storeId: string
 *         description: string
 *         specification: string
 *         image: string
 *         amount: string
 *         price: string
 *         rating: string
 *         color: string
 *         size: []
 *         noOfItems: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
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
 * tags:
 *   name: Products
 *   description: The Product managing API
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductPost'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductPost'
 *       500:
 *         description: Some server error
 */
router.post("/", upload.single('image'), async (req, res) => {
  // register new user
  // winston.info(req.file);
  createProduct(req, res);
});

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", async (req, res) => {
  // get all users
  getProducts(req, res);
});

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get the product by id
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
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", async (req, res) => {
  //get only 1 user
  getProduct(req.params.id, res);
});

/**
 * @swagger
 * /api/product/{id}:
 *  put:
 *    summary: Update the product by id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
  updateProduct(req, res);
});

module.exports = router;
