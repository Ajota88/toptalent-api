const express = require("express");
const {
  register,
  login,
  logout,
  getUserInfo,
} = require("../controllers/auth.controllers");
const { schemaValidator } = require("../middlewares/schemaValidator");
const registerSchema = require("../schemas/registerSchema");

const router = express.Router();

router.post("/register", schemaValidator(registerSchema), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, getUserInfo);

module.exports = router;
