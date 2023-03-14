const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const gigRoutes = require("./gig.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/gigs", gigRoutes);

module.exports = router;