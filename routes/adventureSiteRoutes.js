import express from 'express';
import multer from 'multer';
import {addSite,getAdventureSites,getCategoryById, getPlaceById} from '../controllers/adventureSiteController.js';
import validateSite from '../validators/adventureSiteValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const upload = multer({ storage: multer.memoryStorage() });
//import upload from '../upload.js';
const siterouter  = express.Router();


siterouter.post('/places',upload.single('siteImage'),validateSite,addSite);
siterouter.get('/places',authenticate,getAdventureSites)
siterouter.get('/places/:categoryId',authenticate,getCategoryById)
siterouter.get('/places/details/:id',authenticate,getPlaceById)



export default siterouter;


// add site


/**
 * @swagger
 * /api/places/:
 *   post:
 *     summary: Place Registration
 *     description: Create a new place with place info
 *     tags:
 *       - Adventure Places
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - openTime
 *               - description
 *               - ratings
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arugm Bay Surfing Site
 *               latitude:
 *                 type: number
 *                 example: 37.96784
 *               longitude:
 *                 type: number
 *                 example: 112.8965
 *               openTime:
 *                 type: string
 *                 example: 6:30 AM to 11:00 PM
 *               description:
 *                 type: string
 *                 example: Arugam Bay, located on the southeast coast of Sri Lanka, is a world-renowned surfing destination known for its laid-back vibe, warm waters, and consistent right-hand point breaks. Ideal for both beginners and experienced surfers, it offers waves from May to October, with Main Point, Peanut Farm, and Whiskey Point being popular surf spots. The beach also boasts golden sands, palm-fringed shores, and a vibrant local surf culture.
 *               ratings:
 *                 type: number
 *                 example: 2
 *               categoryId:
 *                 type: string
 *                 example: 68a6ffc48941afe5f869f8b0
 *               siteImage:
 *                 type: string
 *                 format: binary
 *                 description: Upload image file
 *     responses:
 *       201:
 *         description: Adventure area added successfully.
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

/**
 * @swagger
 * /api/places/{categoryId}:
 *   get:
 *     summary: Get site details by category id
 *     description: Get site details by category id.
 *     tags:
 *       - Adventure Places
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID of the place to fetch info
 *     responses:
 *       200:
 *         description: Site details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Site details retrieved successfully."
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

/**
 * @swagger
 * /api/places/details/{id}:
 *   get:
 *     summary: Get site details by id
 *     description: Get site details by id.
 *     tags:
 *       - Adventure Places
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the place to fetch info
 *     responses:
 *       200:
 *         description: Site details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Site details retrieved successfully."
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



//get all adventure places
/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Retrieve all adventures
 *     description: Fetches a list of all Adventures from the system.
 *     tags:
 *       - Adventure Places
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Adventure retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adventure retrieved successfully."
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


