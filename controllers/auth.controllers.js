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

const login = async (req, res, next) => {
  try {
    const user = await authServices.login(req.body);
    const token = jwt.sign(
      {
        id: user.id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Logout successfully" });
};

const getUserInfo = async (req, res) => {
  try {
    const user = await authServices.getUserInfo(req.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("error");
  }
};

module.exports = {
  register,
  login,
  logout,
  getUserInfo,
};
