const express = require("express");
const { authentication } = require("../controller/auth");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: string
 *         password: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The user's authentication managing API
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: User login/Authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The user authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // user login
  authentication(req, res);
});

module.exports = router;
