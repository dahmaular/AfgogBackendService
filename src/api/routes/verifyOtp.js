const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { verifyOtp } = require("../controller/sendOtp");


/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyOtp:
 *       type: object
 *       required:
 *         - email
 *         - code
 *       properties:
 *         email:
 *           type: string
 *           description: The user email address
 *         code:
 *           type: string
 *           description: The verification code
 *       example:
 *         email: string
 *         code: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 */

/**
   * @swagger
   * /api/verify-otp:
   *   post:
   *     summary: Verify a user otp
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VerifyOtp'
   *     responses:
   *       200:
   *         description: The email was successfully verified
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/VerifyOtp'
   *       500:
   *         description: Some server error
   */
router.post("/", async (req, res) => {
    verifyOtp(req, res);
  });
  

module.exports = router;
