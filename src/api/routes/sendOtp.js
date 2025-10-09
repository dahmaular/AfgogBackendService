const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { sendOtp } = require("../controller/sendOtp");

/**
 * @swagger
 * components:
 *   schemas:
 *     Otp:
 *       type: object
 *       required:
 *         - id
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the type
 *         email:
 *           type: string
 *           description: The user email
 *       example:
 *         email: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 */

/**
 * @swagger
 * /api/sendOtp:
 *   post:
 *     summary: Create a new otp
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Otp'
 *     responses:
 *       200:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Otp'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  sendOtp(req, res);
});

module.exports = router;
