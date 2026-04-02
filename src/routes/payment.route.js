const express = require("express");
const {
  makePayment,
  handleSSLCPayment,
  handleStripePayment,
} = require("../controllers/payment.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { makePaymentValidator } = require("../validators/makePayment.validator");
const paymentRouter = express.Router();

// Initiate the payment
paymentRouter.post(
  "/makePayment",
  authMiddleware,
  validate(makePaymentValidator),
  makePayment,
);

// SSLCommerz callbacks
paymentRouter.post("/sslc/successPayment", handleSSLCPayment("success"));
paymentRouter.post("/sslc/failPayment", handleSSLCPayment("failed"));
paymentRouter.post("/sslc/cancelPayment", handleSSLCPayment("cancel"));

// Stripe callbacks
paymentRouter.get("/stripe/successPayment", handleStripePayment("success"));
paymentRouter.get("/stripe/cancelPayment", handleStripePayment("cancel"));

module.exports = paymentRouter;
