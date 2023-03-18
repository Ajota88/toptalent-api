const reviewServices = require("../services/review.services");

const createReview = async (req, res, next) => {
  try {
    const response = await reviewServices.createReview({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).send("Review created");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getGigReviews = async (req, res, next) => {
  try {
    const { gigId } = req.params;
    const response = await reviewServices.getGigReviews(gigId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getGigReviews,
};
