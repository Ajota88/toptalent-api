const db = require("../db/db");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary/cloudinary");

const register = async (user) => {};

const login = async ({ username, password }) => {};

module.exports = {
  register,
  login,
};
