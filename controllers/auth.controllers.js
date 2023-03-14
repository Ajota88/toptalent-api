const authServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const yup = require("yup");

const register = async (req, res) => {
  try {
    res.send("pass");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
