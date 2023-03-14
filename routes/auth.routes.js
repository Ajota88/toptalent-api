const express = require("express");
const { register, login, logout } = require("../controllers/auth.controllers");
const { schemaValidator } = require("../middlewares/schemaValidator");
const loginSchema = require("../schemas/loginSchema");

const router = express.Router();

router.post("/register", schemaValidator(loginSchema), register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
