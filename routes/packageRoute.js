import express from 'express';
import multer from 'multer';
import { addpPackage, getPKid } from '../controllers/packageController.js';
const upload = multer({ storage: multer.memoryStorage() });
//import upload from '../upload.js';
const packagerouter  = express.Router();


packagerouter.post('/packages',upload.single('packageImage'),addpPackage);
packagerouter.get('/packages/:categoryId',getPKid)




export default packagerouter;


// add site



/**
 * @swagger
 * /api/packages/:
 *   post:
 *     summary: Place Registration
 *     description: Create a new place with place info
 *     tags:
 *       - Packages
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - time
 *               - place
 *               - mealAvailability
 *               - description
 *               - ratings
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arugm Bay Surfing Site
 *               price:
 *                 type: number
 *                 exampl: 37.96784
 *               time:
 *                 type: string
 *                 example: 7days
 *               place:
 *                 type: string
 *                 example: Cango National park
 *               mealAvailability:
 *                 type: string
 *                 example: lunch available
 *               description:
 *                 type: string
 *                 example: Arugam Bay, located on the southeast coast of Sri Lanka, is a world-renowned surfing destination known for its laid-back vibe, warm waters, and consistent right-hand point breaks. Ideal for both beginners and experienced surfers, it offers waves from May to October, with Main Point, Peanut Farm, and Whiskey Point being popular surf spots. The beach also boasts golden sands, palm-fringed shores, and a vibrant local surf culture.
 *               ratings:
 *                 type: number
 *                 example: 2
 *               categoryId:
 *                 type: string
 *                 example: 68a6ffc48941afe5f869f8b0
 *               packageImage:
 *                 type: string
 *                 format: binary
 *                 description: Upload image file
 *     responses:
 *       201:
 *         description: package area add successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "package registered successfully."
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




//get all site by category id

/**
 * @swagger
 * /api/packages/{categoryId}:
 *   get:
 *     summary: get site details by category id
 *     description: get site details by category id.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: cat Iof place which want to get infoD 
 * 
 *     responses:
 *       200:
 *         description: site details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "site details retrieved successfully."
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



