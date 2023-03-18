const db = require("../db/db");
const BadRequestError = require("../errors/badRequest");

const createReview = async (reviewInfo) => {
  const findReview = await db
    .select("*")
    .from("reviews")
    .where({ gigId: reviewInfo.gigId, userId: reviewInfo.userId });

  if (findReview.length > 0) {
    throw new BadRequestError("You already made a review");
  }

  await db("gigs")
    .where({
      id: reviewInfo.gigId,
    })
    .update({
      totalReviews: db.raw("?? + 1", ["totalReviews"]),
      totalStars: db.raw("?? + ?", ["totalStars", reviewInfo.star]),
    });

  const newReview = await db("reviews").insert(reviewInfo).returning("id");
  return newReview;
};

const getGigReviews = async (gigId) => {
  const reviews = await db("reviews")
    .join("users", "users.id", "=", "reviews.userId")
    .select("reviews.*", "users.username", "users.img")
    .where("reviews.gigId", gigId);
  return reviews;
};

module.exports = {
  createReview,
  getGigReviews,
};
