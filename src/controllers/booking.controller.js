const { createBookingService } = require("../services/booking.service");

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

module.exports = { createBooking };
