// src/utils/invoice.utils.js

const QRCode = require("qrcode");

// Calculate Total Paid Amount
const calculateTotalPaid = (payments = [], booking) =>
  payments.reduce((acc, payment) => {
    if (payment.status !== "success") return acc;

    const amount =
      payment.paymentPercentage === 50
        ? booking.totalPrice / 2
        : payment.paymentPercentage === 100
          ? booking.totalPrice
          : 0;

    return acc + amount;
  }, 0);

// Build data for invoice
const buildInvoiceData = async ({
  booking,
  room,
  payments,
  totalPaidAmount,
}) => {
  const start = new Date(booking.checkIn);
  const end = new Date(booking.checkOut);

  const diffMs = end - start;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const qrData = await QRCode.toDataURL(
    `${process.env.CLIENT_URL}/bookings/${booking._id}`,
  );
  // convert base64 → buffer
  const qrImageBuffer = Buffer.from(qrData.split(",")[1], "base64");

  return {
    booking,
    room,
    payments,
    totalPaidAmount,
    due: booking.totalPrice - totalPaidAmount,
    gross: room.originalPrice * days,
    qrCode: qrImageBuffer,
  };
};

module.exports = { calculateTotalPaid, buildInvoiceData };
