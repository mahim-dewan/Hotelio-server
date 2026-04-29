const doc = require("pdfkit");
const Booking = require("../models/booking.model");
const Room = require("../models/room.model");
const Payment = require("../models/payment.model");
const ApiError = require("../utils/apiError");
const buildPDF = require("../templates/invoice.template");
const {
  calculateTotalPaid,
  buildInvoiceData,
} = require("../utils/invoice.utils");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const createBookingService = async (bookingPayload) => {
  const { room: roomId, checkIn, checkOut } = bookingPayload;

  // 1. Validate Room
  const room = await Room.findById(roomId)
    .select("_id originalPrice discountPrice discountPercentage isOffer")
    .lean();

  if (!room) {
    throw ApiError(404, "Room not found");
  }

  // 2. Check Availability
  const isBooked = await Booking.exists({
    room: room._id,
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });

  if (isBooked) {
    throw ApiError(400, "Room is not available for the selected dates");
  }

  // 3. Calculate Stay Duration
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const totalDays = Math.ceil((checkOutDate - checkInDate) / MS_PER_DAY);

  if (totalDays <= 0) {
    throw ApiError(400, "Invalid check-in or check-out date");
  }

  // 4. Calculate Pricing
  const pricePerNight = room.isOffer ? room.discountPrice : room.originalPrice;

  const totalPrice = pricePerNight * totalDays;

  // 5. Create Booking
  const booking = await Booking.create({
    ...bookingPayload,
    pricePerNight,
    discount: room.discountPercentage,
    totalPrice,
  });

  return booking;
};

const cancelBookingService = async (id) => {
  // Check Is booking exist
  const booking = await Booking.findById(id);
  if (!booking) {
    throw ApiError(404, "Booking not found");
  }

  if (booking.status === "cancelled") {
    throw ApiError(400, "Booking already cancelled");
  }

  if (booking.status === "confirmed") {
    throw ApiError(
      400,
      "Booking already confirmed. You can't be cancel it. Please contact to hotel authority for cancel it.",
    );
  }

  booking.status = "cancelled";
  await booking.save();

  return booking;
};

const invoiceGenerateService = async (id) => {
  const booking = await Booking.findById(id).populate("room");
  const payments = await Payment.find({ bookingId: booking?._id });
  const room = booking?.room;

  if (!booking && payments.length === 0) {
    throw ApiError(404, "Please Book or Pay first before get invoice.");
  }

  const totalPaidAmount = calculateTotalPaid(payments, booking);

  const invoiceData = await buildInvoiceData({
    booking,
    payments,
    room,
    totalPaidAmount,
  });

  const pdf = await buildPDF(invoiceData);
  return pdf;
};

module.exports = {
  createBookingService,
  cancelBookingService,
  invoiceGenerateService,
};
