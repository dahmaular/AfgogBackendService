const express = require("express");
const { addAppVersion, getAppVersion, updateAppVersion } = require("../controller/appVersion");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AppVersion:
 *       type: object
 *       required:
 *         - id
 *         - ios
 *         - android
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         ios:
 *           type: string
 *           description: The ios version
 *         android:
 *           type: string
 *           description: The android version
 *       example:
 *         id: string
 *         ios: string
 *         android: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AppVersionPost:
 *       type: object
 *       required:
 *         - ios
 *         - android
 *       properties:
 *         ios:
 *           type: string
 *           description: The user ios version
 *         android:
 *           type: string
 *           description: The user android version=
 *       example:
 *         ios: string
 *         android: string
 */

/**
 * @swagger
 * tags:
 *   name: App Version
 *   description: The Version API
 */

/**
 * @swagger
 * /api/addVersion:
 *   post:
 *     summary: Create a new version
 *     tags: [App Version]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppVersionPost'
 *     responses:
 *       200:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppVersionPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
    console.log("here")
  addAppVersion(req, res);
});

/**
 * @swagger
 * /api/appVersion:
 *   get:
 *     summary: Returns the list of all the payment cards
 *     tags: [App Version]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppVersionPost'
 */
router.get("/", async (req, res) => {
  
  getAppVersion(req, res);
});

/**
 * @swagger
 * /api/appVersion/{id}:
 *  put:
 *    summary: Update the user by id
 *    tags: [App Version]
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
 *            $ref: '#/components/schemas/AppVersionPost'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppVersionPost'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", async (req, res) => {
    updateAppVersion(req, res);
  });

module.exports = router;
