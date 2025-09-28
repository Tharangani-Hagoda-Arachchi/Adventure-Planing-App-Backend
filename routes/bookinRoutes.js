import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const bookingrouter = express.Router();

bookingrouter.post("/bookings",authenticate, createBooking);  // Create booking
bookingrouter.get("/bookings",authenticate, getBookings);     // Fetch all bookings

export default bookingrouter;


/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Manage adventure bookings
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - placeId
 *               - date
 *               - travellers
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6500f1234aa2bbf1c2d5e7a8
 *               placeId:
 *                 type: string
 *                 example: 64fae876a91a12345cde7890
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-10
 *               travellers:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for logged-in user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings for the user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
