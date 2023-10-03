const express = require("express");
const { verifyEmail } = require("../controller/user");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyEmail:
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
 *   description: The users managing API
 */

  /**
   * @swagger
   * /api/verify-email:
   *   post:
   *     summary: Verify a new user email
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VerifyEmail'
   *     responses:
   *       200:
   *         description: The email was successfully verified
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/VerifyEmail'
   *       500:
   *         description: Some server error
   */
  router.post("/", async (req, res) => {
    verifyEmail(req, res);
  });
  
  module.exports = router;