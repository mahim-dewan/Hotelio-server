const Booking = require("../models/booking.model");
const Room = require("../models/room.model");
const ApiError = require("../utils/apiError");

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

module.exports = { createBookingService };
