// src/services/stripe.service.js

const Stripe = require("stripe");
const { createPaymentRecord } = require("./payment.service");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripePaymentService = async (payload) => {
  const { price, booking, paymentId } = await createPaymentRecord(payload);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.room.title,
            images: [booking.room.image],
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking?._id.toString(),
      paymentId: paymentId.toString(),
    },
    success_url: `${process.env.SERVER_URL}/payments/stripe/successPayment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SERVER_URL}/payments/stripe/cancelPayment?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.url;
};

module.exports = { createStripePaymentService };
