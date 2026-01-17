const express = require("express");
const { addState, getStates, getState, updateState, deleteState } = require("../controller/state");
const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the state
 *         name:
 *           type: string
 *           description: The state name
 *         code:
 *           type: string
 *           description: The state code
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         name: Lagos
 *         code: LAG
 */

/**
 * @swagger
 * tags:
 *   name: States
 *   description: The State managing API
 */

/**
 * @swagger
 * /api/state:
 *   post:
 *     summary: Create a new state
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: The state was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", auth, async (req, res) => {
  addState(req, res);
});

/**
 * @swagger
 * /api/state:
 *   get:
 *     summary: Returns the list of all states
 *     tags: [States]
 *     responses:
 *       200:
 *         description: The list of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */
router.get("/", async (req, res) => {
  getStates(req, res);
});

/**
 * @swagger
 * /api/state/{id}:
 *   get:
 *     summary: Get a state by id
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The state id
 *     responses:
 *       200:
 *         description: The state details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: State not found
 */
router.get("/:id", async (req, res) => {
  getState(req.params.id, res);
});

/**
 * @swagger
 * /api/state/{id}:
 *   put:
 *     summary: Update a state
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The state id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: The state was updated
 *       404:
 *         description: State not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, async (req, res) => {
  updateState(req, res);
});

/**
 * @swagger
 * /api/state/{id}:
 *   delete:
 *     summary: Delete a state
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The state id
 *     responses:
 *       200:
 *         description: The state was deleted
 *       404:
 *         description: State not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, async (req, res) => {
  deleteState(req, res);
});

module.exports = router;
