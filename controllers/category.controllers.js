const categoryServices = require("../services/category.services");

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryServices.createCategory(req.body);
    res.status(201).send("New category created");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
};
