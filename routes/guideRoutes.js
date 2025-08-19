import express from 'express';
import multer from 'multer';
import {addGuide} from '../controllers/guideController.js';
import validateGuide from '../validators/guideValidator.js';
import upload from '../upload.js';
const guiderouter  = express.Router();


guiderouter.post('/guides',upload.single('image'),validateGuide,addGuide);



export default guiderouter;


// add guide



/**
 * @swagger
 * /api/guides/:
 *   post:
 *     summary: Guide Registration
 *     description: Create a new guide with guide info
 *     tags:
 *       - Guide
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - guideRegno
 *               - guideName
 *               - guideFee
 *               - guideAdventureCategory
 *               - guideAdventurePlace
 *               - guideCategory
 *               - language
 *               - image
 *             properties:
 *               guideRegno:
 *                 type: string
 *                 example:  g6785
 *               guideName:
 *                 type: string
 *                 example: Nimal Perera
 *               guideFee:
 *                 type: number
 *                 example: 2000
 *               guideAdventureCategory:
 *                 type: string
 *                 example: Surfing
 *               guideAdventurePlace:
 *                 type: string
 *                 example: Arugambay Surfing Beach
 *               guideCategory:
 *                 type: string
 *                 example: National
 *               language:
 *                 type: string
 *                 example: English
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload image file
 *     responses:
 *       201:
 *         description: Guide registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Guide registered successfully."
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 errorType:
 *                   type: string
 *                   example: ValidationError
 *                 message:
 *                   type: string
 *                   example: "Validation failed."
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Name must be at least 3 characters."
 *                     - "Role must be one of: operator, admin, commuter."
 *       409:
 *         description: Conflict error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 *                 errorType:
 *                   type: string
 *                   example: ConflictError
 *                 message:
 *                   type: string
 *                   example: "Email already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 errorType:
 *                   type: string
 *                   example: ServerError
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
