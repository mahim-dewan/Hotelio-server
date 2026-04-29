const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

// Sub-schema for specifications
const specificationsSchema = new Schema({
  bedType: { type: String, required: true },
  view: { type: String, required: true },
  floor: { type: String, required: true },
  smoking: { type: String, required: true },
});

// Sub-schema for policies
const policiesSchema = new Schema({
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  cancellation: { type: String, required: true },
  pets: { type: String, required: true },
});

const roomSchema = new Schema(
  {
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    category: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    size: { type: Number, required: true }, // square feet
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    isOffer: { type: Boolean, default: false },
    promoCode: { type: String, default: null },
    amenities: { type: [String], default: [] },
    specifications: { type: specificationsSchema, required: true },
    policies: { type: policiesSchema, required: true },
    isAvailable: { type: Boolean, default: true, index: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ====================
// Indexes
// ====================
roomSchema.index({ title: "text", category: "text" });

// Model
const Room = models.Room || model("Room", roomSchema);

module.exports = Room;
