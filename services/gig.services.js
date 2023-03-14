const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");

const getAllGigs = async ({ cat, minPrice = 0, maxPrice, search }) => {};

const getGig = async (gigId) => {};

const createGig = async (gigInfo) => {};

const deleteGig = async ({ userId, gigId }) => {};

module.exports = {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
};
