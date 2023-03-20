const userServices = require("../services/user.services");

const deleteUser = async (req, res) => {};

const updateUser = async (req, res, next) => {
  try {
    const { confirmPassword, ...userInfo } = req.body;
    await userServices.updateUser({ userInfo, userId: req.userId });
    res.status(201).json({ message: "User Profile Updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  deleteUser,
  updateUser,
};
