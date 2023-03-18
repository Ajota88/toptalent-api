const gigServices = require("../services/gig.services");
const UnauthenticatedError = require("../errors/unauthenticated");

const getAllGigs = async (req, res, next) => {
  try {
    const response = await gigServices.getAllGigs(req.query);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

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

const deleteGig = async (req, res, next) => {
  try {
    let { id } = req.params;
    let gigId = Number(id);

    const response = await gigServices.deleteGig({ userId: req.userId, gigId });
    res.status(202).json({ message: "gig deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
};
