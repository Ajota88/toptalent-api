const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/category.controllers");
const { schemaValidator } = require("../middlewares/schemaValidator");
const categorySchema = require("../schemas/categorySchema");

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", schemaValidator(categorySchema), createCategory);

module.exports = router;
