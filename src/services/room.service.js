// src/services/room.service.js

const Room = require("../models/room.model");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const { getPagination } = require("../utils/pagination");

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
const exclusiveRoomsService = async (query) => {
  const { limit, skip } = getPagination(query?.page);

  let filter = { isExclusive: true };
  const rooms = await Room.find(filter)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No exclusive rooms found");
  }

  const count = await Room.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);

  return { rooms, totalPages, count };
};

// Featured rooms service
const featuredRoomsService = async (query) => {
  const { limit, skip } = getPagination(query?.page);

  let filter = { category: "luxury" };
  const rooms = await Room.find(filter)
    .sort({ bookingsCount: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No featured rooms found");
  }

  const count = await Room.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);

  return { rooms, totalPages, count };
};

// Family friendly rooms service
const familyFriendlyRoomsService = async (query) => {
  const { limit, skip } = getPagination(query?.page);
  const capacity = query?.capacity || "all";

  const capacityFilters = {
    all: { $gte: 4 },

    // 4 - 5 guests
    small: {
      $gte: 4,
      $lte: 5,
    },

    // 5 - 6 guests
    medium: {
      $gte: 5,
      $lte: 6,
    },

    // 6+ guests
    large: {
      $gt: 6,
    },
  };

  let filter = {
    capacity: capacityFilters[capacity] || capacityFilters.all,
    size: { $gt: 400 },
  };

  const rooms = await Room.find(filter)
    .sort({ capacity: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No featured rooms found");
  }

  const count = await Room.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);

  return { rooms, totalPages, count };
};

// Luxury friendly rooms service
const luxuryRoomsService = async (query) => {
  const { limit, skip } = getPagination(query?.page);

  let filter = {
    category: { $in: ["luxury", "villa", "deluxe"] },
  };
  const rooms = await Room.find(filter)
    .sort({ originalPrice: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No luxury rooms found");
  }

  const count = await Room.countDocuments(filter);

  const totalPages = Math.ceil(count / limit);

  return { rooms, totalPages, count };
};

// Budget friendly rooms service
const budgetFriendlyRoomsService = async (query) => {
  const { limit, skip } = getPagination(query?.page);

  let filter = {
    $or: [{ category: "standard" }, { originalPrice: { $lte: 150 } }],
  };

  const rooms = await Room.find(filter)
    .sort({ originalPrice: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!rooms.length) {
    throw ApiError(404, "No budget friendly rooms found");
  }

  const count = await Room.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);

  return { rooms, totalPages, count };
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
