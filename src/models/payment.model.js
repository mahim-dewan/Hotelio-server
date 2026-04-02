const { Schema, model, models } = require("mongoose");

const paymentSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking", // Reference to Booking model
      required: [true, "Booking ID is required"],
    },
    currency: {
      type: String,
      enum: {
        values: ["BDT", "USD"],
        message: "Currency must be either BDT or USD",
      },
      required: [true, "Currency is required"],
      uppercase: true, // optional but ensures consistent format
      trim: true,
    },
    method: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    paymentPercentage: {
      type: Number,
      required: [true, "Payment paymentPercentage is required"],
      enum: {
        values: [50, 100],
        message: "Payment paymentPercentage must be 50 or 100 percent",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "cancel", "success", "refunded"],
        message:
          "Status must be one of: init, pending, cancel, success, refunded",
      },
      default: "pending",
    },

    tran_id: {
      type: String,
      trim: true,
    },

    val_id: {
      type: String,
      trim: true,
    },

    card_brand: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = models.Payment || model("Payment", paymentSchema);

module.exports = Payment;
