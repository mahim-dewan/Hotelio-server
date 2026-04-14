// src/app.js

require("dotenv").config();
require("./config/passport.js");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");
const authRouter = require("./routes/auth.route.js");
const bookingRouter = require("./routes/booking.route.js");
const errorHandler = require("./middlewares/error.middleware.js");
const { authMiddleware } = require("./middlewares/auth.middleware.js");
const paymentRouter = require("./routes/payment.route.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://hotel-hotelio.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());

// Database connection
connectDB();

// Routes
app.get("/api", async (req, res) => {
  res.send(
    "<h1 style='color:green; text-align:center ; margin-top:100px; font-family:arial' >Welcome to the Hotelio Server</h1>",
  );
});

app.use("/api/auth", authRouter);
app.use("/api/bookings", authMiddleware, bookingRouter);
app.use("/api/payments", paymentRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// ----- Centralized Error Handler -----
app.use(errorHandler);

module.exports = app;
