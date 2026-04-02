const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const ApiError = require("../utils/apiError");

const createPaymentRecord = async ({
  bookingId,
  currency,
  paymentPercentage,
}) => {
  const booking = await Booking.findById(bookingId).populate("room user");
  if (!booking) throw ApiError(404, "Please book a room before payment");

  // Calculate price
  let price =
    paymentPercentage === 100 ? booking.totalPrice : booking.totalPrice / 2;

  // Delete previous pending payments
  await Payment.deleteMany({ bookingId: booking?._id });

  const alreadyPaid = await Payment.findOne({
    bookingId: booking?._id,
    status: "success",
  });
  if (alreadyPaid) throw ApiError(400, "Already paid");

  // create payment record first
  const payment = await Payment.create({
    bookingId: booking._id,
    amount: price,
    currency,
    status: "pending",
    paymentPercentage,
  });

  return { price, booking, paymentId: payment._id };
};

module.exports = { createPaymentRecord };
