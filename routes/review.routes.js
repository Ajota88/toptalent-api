const express = require("express");
const {
  createReview,
  getGigReviews,
} = require("../controllers/review.controllers");
const { verifyToken } = require("../middlewares/jwtVerification");
const reviewSchema = require("../schemas/reviewSchema");
const { schemaValidator } = require("../middlewares/schemaValidator");

const router = express.Router();

router.get("/:gigId", getGigReviews);
router.post("/", verifyToken, schemaValidator(reviewSchema), createReview);

module.exports = router;
