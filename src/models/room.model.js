// src/models/room.model.js

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

// Main schema
const roomSchema = new Schema(
  {
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    category: {
      type: String,
      required: true,
      enum: ["standard", "deluxe", "suite", "luxury", "villa"],
      default: "standard",
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    size: { type: Number, required: true }, // square feet
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    isExclusive: { type: Boolean, default: false, index: true },
    promoCode: { type: String, default: null },
    amenities: { type: [String], default: [] },
    specifications: { type: specificationsSchema, required: true },
    policies: { type: policiesSchema, required: true },
    bookingCount: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Model
const Room = models.Room || model("Room", roomSchema);

module.exports = Room;
