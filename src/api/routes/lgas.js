const express = require("express");
const { addLGA, getLGAs, getLGA, updateLGA, deleteLGA } = require("../controller/lga");
const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     LGA:
 *       type: object
 *       required:
 *         - name
 *         - stateId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the LGA
 *         name:
 *           type: string
 *           description: The LGA name
 *         state:
 *           type: object
 *           description: The state this LGA belongs to
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         name: Ikeja
 *         state:
 *           id: 507f1f77bcf86cd799439012
 *           name: Lagos
 *           code: LAG
 */

/**
 * @swagger
 * tags:
 *   name: LGAs
 *   description: The LGA managing API
 */

/**
 * @swagger
 * /api/lga:
 *   post:
 *     summary: Create a new LGA
 *     tags: [LGAs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - stateId
 *             properties:
 *               name:
 *                 type: string
 *               stateId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The LGA was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LGA'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", auth, async (req, res) => {
  addLGA(req, res);
});

/**
 * @swagger
 * /api/lga:
 *   get:
 *     summary: Returns the list of all LGAs or LGAs filtered by state
 *     tags: [LGAs]
 *     parameters:
 *       - in: query
 *         name: stateId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter LGAs by state ID
 *     responses:
 *       200:
 *         description: The list of LGAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LGA'
 */
router.get("/", async (req, res) => {
  getLGAs(req, res);
});

/**
 * @swagger
 * /api/lga/{id}:
 *   get:
 *     summary: Get an LGA by id
 *     tags: [LGAs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The LGA id
 *     responses:
 *       200:
 *         description: The LGA details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LGA'
 *       404:
 *         description: LGA not found
 */
router.get("/:id", async (req, res) => {
  getLGA(req.params.id, res);
});

/**
 * @swagger
 * /api/lga/{id}:
 *   put:
 *     summary: Update an LGA
 *     tags: [LGAs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The LGA id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - stateId
 *             properties:
 *               name:
 *                 type: string
 *               stateId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The LGA was updated
 *       404:
 *         description: LGA not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, async (req, res) => {
  updateLGA(req, res);
});

/**
 * @swagger
 * /api/lga/{id}:
 *   delete:
 *     summary: Delete an LGA
 *     tags: [LGAs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The LGA id
 *     responses:
 *       200:
 *         description: The LGA was deleted
 *       404:
 *         description: LGA not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, async (req, res) => {
  deleteLGA(req, res);
});

module.exports = router;
