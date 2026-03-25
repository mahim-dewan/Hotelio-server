const { Schema, model, models } = require("mongoose");

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room ID is required"],
      index: true,
    },

    checkIn: { type: Date, required: "Check-in date is required" },

    checkOut: { type: Date, required: "Check-out date is required" },

    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
      index: true,
    },

    isPaid: { type: Boolean, default: false },

    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true, versionKey: false },
);

// ====================
// Indexes
// ====================
bookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ user: 1, createdAt: -1 });

// =====================
// Validations
// =====================
bookingSchema.pre("validate", function (next) {
  if (this.checkIn >= this.checkOut) {
    return next(new Error("Check-out must be after check-in"));
  }

  next();
});

const Booking = models.Booking || model("Booking", bookingSchema);

module.exports = Booking;
