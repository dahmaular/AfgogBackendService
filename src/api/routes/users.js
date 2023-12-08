const express = require("express");
const { createUser, getAllUsers, getUser, updateUserProfile } = require("../controller/user");
const router = express.Router();

// const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - fullName
 *         - email
 *         - phone
 *         - password
 *         - isAgent
 *         - agencyName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The user first name
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The phone number
 *         password:
 *           type: string
 *           description: The user password
 *         isAgent:
 *           type: boolean
 *           description: The user role
 *         agencyName:
 *           type: string
 *           description: The user aagency name
 *       example:
 *         id: string
 *         fullName: string
 *         email: string
 *         phone: string
 *         password: string
 *         isAgent: string
 *         agencyName: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPost:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - password
 *         - isAgent
 *         - agencyName
 *       properties:
 *         fullName:
 *           type: string
 *           description: The user first name
 *         email:
 *           type: string
 *           description: The user email address
 *         phone:
 *           type: string
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *         isAgent:
 *           type: boolean
 *           description: The user role
 *         agencyName:
 *           type: string
 *           description: The user agency name
 *       example:
 *         fullName: string
 *         email: string
 *         phone: string
 *         password: string
 *         isAgent: string
 *         agencyName: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - fullName
 *         - phone
 *       properties:
 *         fullName:
 *           type: string
 *           description: The user first name
 *         phone:
 *           type: string
 *           description: The user phone
 *       example:
 *         fullName: string
 *         phone: string
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
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // register new user
  // winston.info(req.file);
  createUser(req, res);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  // get all users
  getAllUsers(res);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", async (req, res) => {
  //get only 1 user
  getUser(req.params.id, res);
});

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update the user by id
 *    tags: [Users]
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
 *            $ref: '#/components/schemas/UserProfile'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserProfile'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
  updateUserProfile(req, res);
});

module.exports = router;
