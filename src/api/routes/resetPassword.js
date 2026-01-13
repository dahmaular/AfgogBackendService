const express = require("express");
const router = express.Router();
const { resetPassword } = require("../controller/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           minLength: 5
 *           description: The new password (minimum 5 characters)
 *       example:
 *         password: newPassword123
 */

/**
 * @swagger
 * /api/reset-password/{token}:
 *   post:
 *     summary: Reset password using token from email
 *     tags: [Password Reset]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isSuccess:
 *                   type: boolean
 *                 userType:
 *                   type: string
 *       400:
 *         description: Invalid or expired token / Password validation error
 *       500:
 *         description: Server error
 */
router.post("/:token", resetPassword);

module.exports = router;
