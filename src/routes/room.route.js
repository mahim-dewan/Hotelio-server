// src/routes/room.route.js

const express = require("express");
const {
  exclusiveRooms,
  featuredRooms,
  familyFriendlyRooms,
  luxuryRooms,
  budgetFriendlyRooms,
  createRoom,
} = require("../controllers/room.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { roomValidator } = require("../validators/room.validator");

const roomRouter = express.Router();

// Create a new room
roomRouter.post(
  "/createRoom",
  authMiddleware,
  authorize("ADMIN", "MODERATOR"),
  validate(roomValidator),
  createRoom,
);

// Get rooms
roomRouter.get("/exclusive", exclusiveRooms);
roomRouter.get("/featured", featuredRooms);
roomRouter.get("/family-friendly", familyFriendlyRooms);
roomRouter.get("/luxury", luxuryRooms);
roomRouter.get("/budget-friendly", budgetFriendlyRooms);

module.exports = roomRouter;
