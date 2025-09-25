import express from "express";
import { globalSearch, searchPackages, searchSites } from "../controllers/searchController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const searchrouter = express.Router();


searchrouter.get("/adventures",authenticate,searchSites);
searchrouter.get("/all",authenticate,globalSearch);
searchrouter.get("/packages",authenticate,searchPackages);

export default searchrouter;


/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Endpoints for searching adventures, packages, or globally
 */

/**
 * @swagger
 * /api/search/adventures:
 *   get:
 *     summary: Search adventure places
 *     description: Search adventure places by query (e.g., name, location, category).
 *     tags:
 *       - Search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search text to find matching adventure places
 *     responses:
 *       200:
 *         description: Adventure places retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adventure places retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: { id: "123", name: "Surfing Spot", location: "Hawaii" }
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/search/all:
 *   get:
 *     summary: Global search
 *     description: Search across adventures, packages, and sites globally.
 *     tags:
 *       - Search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search text to perform a global search
 *     responses:
 *       200:
 *         description: Global search results retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Global search results retrieved successfully."
 *                 data:
 *                   type: object
 *                   example: { adventures: [...], packages: [...], sites: [...] }
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/search/packages:
 *   get:
 *     summary: Search packages
 *     description: Search travel/adventure packages by query.
 *     tags:
 *       - Search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search text to find matching packages
 *     responses:
 *       200:
 *         description: Packages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Packages retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: { id: "456", name: "Hawaii Surfing Package", price: 500 }
 *       500:
 *         description: Internal server error.
 */
