const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../controller/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user email address
 *       example:
 *         email: user@example.com
 */

/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Password reset management API
 */

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Email is required
 *       404:
 *         description: No account found with this email
 *       500:
 *         description: Server error
 */
router.post("/", forgotPassword);

module.exports = router;
