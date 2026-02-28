// src/app.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const errorHandler = require("./middlewares/error.middleware.js");
const authRouter = require("./routes/auth.routes.js");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("./config/passport.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://hotel-hotelio.vercel.app/"],
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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// ----- Centralized Error Handler -----
app.use(errorHandler);

module.exports = app;
