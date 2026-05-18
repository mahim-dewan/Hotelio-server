// src/services/payment.service.js

const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const ApiError = require("../utils/apiError");

const createPaymentRecord = async ({
  bookingId,
  currency,
  paymentPercentage,
}) => {
  // Check room is booked before payment
  const booking = await Booking.findById(bookingId).populate("room user");
  if (!booking) throw ApiError(404, "Please book a room before payment");

  // Check already paid for this booked room
  const alreadyFullPaid = await Payment.findOne({
    bookingId: booking?._id,
    status: "success",
    paymentPercentage: 100,
  });
  if (alreadyFullPaid) throw ApiError(400, "Already paid");

  // Check already paid by 2 records
  const halfPaids = await Payment.find({
    bookingId: booking?._id,
    status: "success",
    paymentPercentage: 50,
  });
  if (halfPaids.length > 1)
    throw ApiError(400, "Already paid. You have no due.");

  // Verify if already 50% paid then can't pay again 100%. allow only remaining 50% payment.
  if (paymentPercentage === 100 && halfPaids.length)
    throw ApiError(400, "Half payment already completed.");

  // Delete previous pending/canceled/failed payments
  await Payment.deleteMany({
    bookingId: booking?._id,
    status: { $ne: "success" },
  });

  const USD_TO_BDT = currency === "BDT" ? 110 : 1;

  // Calculate price
  let price =
    (paymentPercentage === 100 ? booking.totalPrice : booking.totalPrice / 2) *
    USD_TO_BDT;

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

const getPaymentsByBookingsService = async (bookingIds) => {
  // Get all payments data by booking IDs
  const payments = await Payment.find({ bookingId: { $in: bookingIds } });

  if (payments.length === 0) {
    throw ApiError(404, "Payment not found for this booking");
  }

  return payments;
};

module.exports = { createPaymentRecord, getPaymentsByBookingsService };
