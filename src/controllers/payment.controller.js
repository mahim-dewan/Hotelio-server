const { default: Stripe } = require("stripe");
const Payment = require("../models/payment.model");
const { createSSLPaymentService } = require("../services/sslCommerz.service");
const { createStripePaymentService } = require("../services/stripe.service");
const { sslcommerzValidator } = require("../utils/paymentVerify");
const Booking = require("../models/booking.model");
const { getPaymentsByBookingsService } = require("../services/payment.service");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----- Make Payment -----
const makePayment = async (req, res, next) => {
  try {
    const { currency } = req.body;

    if (currency === "BDT") {
      const url = await createSSLPaymentService(req.body);
      return res.status(200).json({ success: true, url });
    }

    if (currency === "USD") {
      const url = await createStripePaymentService(req.body);
      return res.status(200).json({ success: true, url });
    }

    res
      .status(400)
      .json({ success: false, message: "Please select a valid currency" });
  } catch (err) {
    next(err);
  }
};

const getPaymentsByBookings = async (req, res, next) => {
  try {
    const bookingIds = req.body?.bookingIds;

    const payment = await getPaymentsByBookingsService(bookingIds);

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

// ----- Generic SSLCommerz Handler -----
const handleSSLCPayment = (status) => async (req, res, next) => {
  try {
    const data = req.body;

    if (status === "success") {
      const validate = await sslcommerzValidator(data?.val_id);

      if (validate.status !== "VALID") {
        return res
          .status(400)
          .json({ success: false, message: "Payment not completed" });
      }
    }

    const payment = await Payment.findByIdAndUpdate(
      data?.value_a,
      {
        status,
        tran_id: data?.tran_id,
        val_id: data?.val_id,
        method: data?.card_issuer,
        card_brand: data?.card_brand,
      },
      { new: true },
    );

    if (payment.status === "success") {
      await Booking.findOneAndUpdate(
        { _id: payment?.bookingId },
        { status: "confirmed" },
        { new: true },
      );
    }

    return res.redirect(
      `${process.env.CLIENT_URL}/mybookings?payment=${status}&tran_id=${payment?.tran_id}`,
    );
  } catch (err) {
    next(err);
  }
};

// ----- Generic Stripe Handler -----
const handleStripePayment = (status) => async (req, res, next) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const updatedStatus =
      status === "success" && session.payment_status !== "paid"
        ? "failed"
        : status;

    const bookingId = session.metadata.bookingId;
    const paymentId = session.metadata.paymentId;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: updatedStatus,
        tran_id: session.id,
        method: "stripe",
      },
      { new: true },
    );

    if (payment.status === "success") {
      await Booking.findOneAndUpdate(
        { _id: payment?.bookingId },
        { status: "confirmed" },
        { new: true },
      );
    }

    return res.redirect(
      `${process.env.CLIENT_URL}/mybookings?payment=${updatedStatus}&tran_id=${payment?.tran_id}`,
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  makePayment,
  getPaymentsByBookings,
  handleSSLCPayment,
  handleStripePayment,
};
