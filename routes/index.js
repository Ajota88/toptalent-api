const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const gigRoutes = require("./gig.routes");
const categoryRoutes = require("./category.routes");
const reviewRoutes = require("./review.routes");
const orderRoutes = require("./order.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/gigs", gigRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
