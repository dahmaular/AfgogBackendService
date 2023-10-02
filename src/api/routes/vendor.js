const express = require("express");
const { createAccount, getAllVendors, getVendor, updateProfile, updateVendorProfile } = require("../controller/vendor");
const router = express.Router();

// const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - password
 *         - storeName
 *         - businessType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The phone number
 *         password:
 *           type: string
 *           description: The user password
 *         storeName:
 *           type: string
 *           description: The store name
 *         businessAddress:
 *           type: string
 *           description: The user last name
 *         businessType:
 *           type: string
 *           description: The user email
 *         bankName:
 *           type: string
 *           description: The phone number
 *         accountNumber:
 *           type: string
 *           description: The user password
 *         bvn:
 *           type: string
 *           description: The user password
 *       example:
 *         id: string
 *         firstName: string
 *         lastName: string
 *         email: string
 *         phone: string
 *         password: string
 *         storeName: string
 *         businessAddress: string
 *         businessType: string
 *         bankName: string
 *         accountNumber: string
 *         bvn: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VendorPost:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - password
 *         - storeName
 *         - businessType
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
 *         phone:
 *           type: string
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *         storeName:
 *           type: string
 *           description: The store name
 *         businessAddress:
 *           type: string
 *           description: The user last name
 *         businessType:
 *           type: string
 *           description: The user email
 *         bankName:
 *           type: string
 *           description: The phone number
 *         accountNumber:
 *           type: string
 *           description: The user password
 *         bvn:
 *           type: string
 *           description: The user password
 *       example:
 *         firstName: string
 *         lastName: string
 *         email: string
 *         phone: string
 *         password: string
 *         storeName: string
 *         businessAddress: string
 *         businessType: string
 *         bankName: string
 *         accountNumber: string
 *         bvn: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VendorProfile:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - storeName
 *         - businessType
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         storeName:
 *           type: string
 *           description: The store name
 *         businessAddress:
 *           type: string
 *           description: The user last name
 *         businessType:
 *           type: string
 *           description: The user email
 *         bankName:
 *           type: string
 *           description: The phone number
 *         accountNumber:
 *           type: string
 *           description: The user password
 *       example:
 *         firstName: string
 *         lastName: string
 *         storeName: string
 *         businessAddress: string
 *         businessType: string
 *         bankName: string
 *         accountNumber: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPassword:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: The user full name
 *         newPassword:
 *           type: string
 *           description: The user email address
 *       example:
 *         oldPassword: string
 *         newPassword: string
 */

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: The vendors managing API
 */

/**
 * @swagger
 * /api/vendors:
 *   post:
 *     summary: Create a new user
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VendorPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // register new user
  // winston.info(req.file);
  createAccount(req, res);
});

/**
 * @swagger
 * /api/vendors:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendor'
 */
router.get("/", async (req, res) => {
  // get all users
  getAllVendors(res);
});

/**
 * @swagger
 * /api/vendors/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Vendors]
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
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", async (req, res) => {
  //get only 1 user
  getVendor(req.params.id, res);
});

/**
 * @swagger
 * /api/vendors/{id}:
 *  put:
 *    summary: Update the user by id
 *    tags: [Vendors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The vendor id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VendorProfile'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VendorProfile'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
  updateVendorProfile(req, res);
});

module.exports = router;
