import express from 'express';
import multer from 'multer';
import {addGuide,getGuide, getGuideByPlace} from '../controllers/guideController.js';
import validateGuide from '../validators/guideValidator.js';
const upload = multer({ storage: multer.memoryStorage() });
//import upload from '../upload.js';
const guiderouter  = express.Router();


guiderouter.post('/guides',upload.single('guideImage'),validateGuide,addGuide);
guiderouter.get('/guides',getGuide)
guiderouter.get('/guides/:placeName',getGuideByPlace)



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
 *               - ratings
 *               - guidePhoneNo
 *               - guideEmail
 *               - guideAddress
 *               - guideValidity
 *               - guideImage
 *             properties:
 *               guideRegno:
 *                 type: string
 *                 example: g6785
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
 *               ratings:
 *                 type: number
 *                 example: 2
 *               guidePhoneNo:
 *                 type: string
 *                 example: 0784536279
 *               guideEmail:
 *                 type: string
 *                 example: Nimal@gmail.com
 *               guideAddress:
 *                 type: string
 *                 example: 133/A Galle road, Colombo
 *               guideValidity:
 *                 type: string
 *                 example: 31st December 2025
 *               guideImage:
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
 *                     
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




//get all guides
/**
 * @swagger
 * /api/guides:
 *   get:
 *     summary: Retrieve all operators
 *     description: Fetches a list of all operator users from the system.
 *     tags:
 *       - Guide
 *     responses:
 *       200:
 *         description: Operators retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Operators retrieved successfully."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 *       401:
 *         description: Authentication error.
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
 *                   example: 401
 *                 errorType:
 *                   type: string
 *                   example: AuthenticationError
 *                 message:
 *                   type: string
 *                   example: "token invalid."
 *       403:
 *         description: Authorization error.
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
 *                   example: 403
 *                 errorType:
 *                   type: string
 *                   example: AuthorizationError
 *                 message:
 *                   type: string
 *                   example: "Access Denied."
 */


/**
 * @swagger
 * /api/guides/{placeName}:
 *   get:
 *     summary: get site details by id
 *     description: get site details by id.
 *     tags:
 *       - Guide
 *     parameters:
 *       - in: path
 *         name: placeName
 *         required: true
 *         schema:
 *           type: string
 *         description: place name for find guide
 * 
 *     responses:
 *       200:
 *         description: Guide details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Guide details retrieved successfully."
 *
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

