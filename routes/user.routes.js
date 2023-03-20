const express = require("express");
const { deleteUser, updateUser } = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/jwtVerification");

const router = express.Router();

router.get("/");
router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/", verifyToken, updateUser);

module.exports = router;
