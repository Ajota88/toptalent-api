const express = require("express");
const { deleteUser } = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/jwtVerification");

const router = express.Router();

router.get("/");
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
