const authServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { confirmPassword, ...userInfo } = req.body;
    const newUser = await authServices.register(userInfo);

    res.status(201).json({ message: "user created succesfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
