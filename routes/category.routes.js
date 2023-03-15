const express = require("express");
const { createCategory } = require("../controllers/category.controllers");
const { schemaValidator } = require("../middlewares/schemaValidator");
const categorySchema = require("../schemas/categorySchema");

const router = express.Router();

router.post("/", schemaValidator(categorySchema), createCategory);

module.exports = router;
