const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const { addBusinessType, getBusinessType } = require("../controller/businessType");

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessType:
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
 *     BusinessTypePost:
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
 *   name: Vendors
 *   description: The vendors managing API
 */

/**
 * @swagger
 * /api/business-type:
 *   post:
 *     summary: Create a new business type
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessTypePost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessTypePost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  // register new user
  // winston.info(req.file);
  addBusinessType(req, res);
});

/**
 * @swagger
 * /api/business-type:
 *   get:
 *     summary: Returns the list of all the business types
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessType'
 */
router.get("/", auth, async (req, res) => {
  // get all business types
  getBusinessType(req, res);
});

module.exports = router;
