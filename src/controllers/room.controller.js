// src/controllers/room.controller.js

const Room = require("../models/room.model");
const {
  exclusiveRoomsService,
  featuredRoomsService,
  familyFriendlyRoomsService,
  luxuryRoomsService,
  budgetFriendlyRoomsService,
  createRoomService,
  getRoomBySlugService,
} = require("../services/room.service");

// Create a new room
const createRoom = async (req, res, next) => {
  try {
    const room = await createRoomService(req.body);

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

// Get exclusive rooms
const exclusiveRooms = async (req, res, next) => {
  try {
    const rooms = await exclusiveRoomsService();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// Get featured rooms
const featuredRooms = async (req, res, next) => {
  try {
    const rooms = await featuredRoomsService();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// Get family friendly rooms
const familyFriendlyRooms = async (req, res, next) => {
  try {
    const rooms = await familyFriendlyRoomsService();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// Get luxury rooms
const luxuryRooms = async (req, res, next) => {
  try {
    const rooms = await luxuryRoomsService();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// Get budget friendly rooms
const budgetFriendlyRooms = async (req, res, next) => {
  try {
    const rooms = await budgetFriendlyRoomsService();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// Get single room
const getRoomBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const room = await getRoomBySlugService(slug);

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  exclusiveRooms,
  featuredRooms,
  familyFriendlyRooms,
  luxuryRooms,
  budgetFriendlyRooms,
  getRoomBySlug,
};
