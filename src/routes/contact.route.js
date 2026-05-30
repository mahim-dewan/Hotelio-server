// src/routes/contact.route.js

const express = require("express");
const { createContactMessage } = require("../controllers/contact.controller");
const validate = require("../middlewares/validate.middleware");
const { contactValidator } = require("../validators/contact.validator");
const contactRouter = express.Router();

contactRouter.post("/", validate(contactValidator), createContactMessage);

module.exports = contactRouter;
