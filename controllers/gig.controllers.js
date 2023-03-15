const gigServices = require("../services/gig.services");
const UnauthenticatedError = require("../errors/unauthenticated");

const getAllGigs = async (req, res) => {};

const getGig = async (req, res) => {};

const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      throw new UnauthenticatedError("Not a seller");
    }

    const response = await gigServices.createGig({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteGig = async (req, res) => {};

module.exports = {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
};
