const authServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  res.send("test");
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
