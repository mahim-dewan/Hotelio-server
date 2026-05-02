// src/services/room.service.js

const Room = require("../models/room.model");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// Create a new room service
const createRoomService = async (room) => {
  // 1. If discount available calculate discount price
  if (room?.discountPercentage) {
    room.discountPrice =
      room.originalPrice -
      (room.originalPrice * room?.discountPercentage) / 100;
  }

  // 2. Generate slug
  const baseSlug = slugify(room.title, {
    lower: true,
    trim: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;
  while (await Room.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  room.slug = slug;

  const newRoom = new Room(room);
  const createdRoom = await newRoom.save();

  if (!createdRoom) {
    throw ApiError(500, "New Room Create Failed");
  }

  return createdRoom;
};

// Exclusive rooms service
const exclusiveRoomsService = async () => {
  const rooms = await Room.find({ isExclusive: true }).lean();

  if (!rooms.length) {
    throw ApiError(404, "No exclusive rooms found");
  }

  return rooms;
};

// Featured rooms service
const featuredRoomsService = async () => {
  const rooms = await Room.find({ category: "luxury" })
    .sort({ bookingsCount: -1 })
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No featured rooms found");
  }

  return rooms;
};

// Family friendly rooms service
const familyFriendlyRoomsService = async () => {
  const rooms = await Room.find({
    capacity: { $gte: 4 },
    size: { $gt: 400 },
  })
    .sort({ capacity: -1 })
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No featured rooms found");
  }

  return rooms;
};

// Luxury friendly rooms service
const luxuryRoomsService = async () => {
  const rooms = await Room.find({
    category: { $in: ["luxury", "villa", "deluxe"] },
  })
    .sort({ originalPrice: -1 })
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No luxury rooms found");
  }

  return rooms;
};

// Budget friendly rooms service
const budgetFriendlyRoomsService = async () => {
  const rooms = await Room.find({
    $or: [{ category: "standard" }, { originalPrice: { $lte: 150 } }],
  })
    .sort({ originalPrice: 1 })
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No budget friendly rooms found");
  }

  return rooms;
};

// Single room service
const getRoomBySlugService = async (slug) => {
  const room = await Room.findOne({ slug }).lean();

  if (!room) {
    throw ApiError(404, "Room not found");
  }

  return room;
};

module.exports = {
  createRoomService,
  exclusiveRoomsService,
  featuredRoomsService,
  familyFriendlyRoomsService,
  luxuryRoomsService,
  budgetFriendlyRoomsService,
  getRoomBySlugService,
};
