
import Booking from "../models/booking.js";
import { AppError } from "../utils/errorHandler.js";

//ave bookings
export const createBooking = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      bookingTypeId,
      packageId,
      guideId,
      date,
      travellers,
      pricePerPerson,
      totalPrice
    } = req.body;


    if (!name || !email || !phone || !address) {
      return next(new AppError("All customer details are required", 400));
    }
    if (!bookingTypeId || !date || !travellers) {
      return next(new AppError("Booking details missing", 400));
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      address,
      bookingTypeId,
      packageId,
      guideId,
      date,
      travellers,
      pricePerPerson,
      totalPrice
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });

  } catch (error) {
    next(error);
  }
};

//get all boking
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
