const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const { requestInspection, getAllInspections, getInspectionDateByUserID, getInspectionDateByID } = require("../controller/inspect");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inspections:
 *       type: object
 *       required:
 *         - id
 *         - inspectorId
 *         - inpectionDate
 *         - inspectionTime
 *         - propertyId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         inspectorId:
 *           type: string
 *           description: The user first name
 *         inpectionDate:
 *           type: string
 *           description: The user phone number
 *         inspectionTime:
 *           type: string
 *           description: The user city
 *         propertyId:
 *           type: string
 *           description: The user Address
 *       example:
 *         id: string
 *         inspectorId: string
 *         inpectionDate: string
 *         inspectionTime: string
 *         propertyId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InspectionsPost:
 *       type: object
 *       required:
 *         - inspectorId
 *         - inpectionDate
 *         - inspectionTime
 *         - propertyId
 *       properties:
 *         inspectorId:
 *           type: string
 *           description: The user id
 *         inpectionDate:
 *           type: string
 *           description: The dae of inspection
 *         inspectionTime:
 *           type: string
 *           description: The time of inspection
 *         propertyId:
 *           type: string
 *           description: The id of the proposed property
 *       example:
 *         inspectorId: string
 *         inpectionDate: string
 *         inspectionTime: string
 *         propertyId: string
 */

/**
 * @swagger
 * tags:
 *   name: Inspections
 *   description: The Inspection managing API
 */

/**
 * @swagger
 * /api/inspection:
 *   post:
 *     summary: Create a new Payment Card
 *     tags: [Inspections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InspectionsPost'
 *     responses:
 *       200:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionsPost'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  
  requestInspection(req, res);
});

/**
 * @swagger
 * /api/inspection:
 *   get:
 *     summary: Returns the list of all the Inspection dates
 *     tags: [Inspections]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InspectionsPost'
 */
router.get("/", auth, async (req, res) => {
  // get all business types
  getAllInspections(req, res);
});

/**
 * @swagger
 * /api/inspection/{id}:
 *   get:
 *     summary: Get the address by user id
 *     tags: [Inspections]
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
 *               $ref: '#/components/schemas/InspectionsPost'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", auth, async (req, res) => {
  // get address of 1 user
  getInspectionDateByID(req.params.id, res);
});

module.exports = router;
