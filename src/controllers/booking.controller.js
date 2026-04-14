const Booking = require("../models/booking.model");
const {
  createBookingService,
  cancelBookingService,
} = require("../services/booking.service");

// Create a new booking
const createBooking = async (req, res, next) => {
  try {
    const userId = req?.user?._id;

    await createBookingService({ user: userId, ...req.body });

    return res
      .status(201)
      .json({ success: true, message: "Thank you for your booking" });
  } catch (err) {
    next(err);
  }
};

//Get all bookings by User
const getBookingsByUser = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a booking
const cancelBookingByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await cancelBookingService(id);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getBookingsByUser, cancelBookingByUser };
