const express = require("express");
const { verifyToken } = require("../middlewares/jwtVerification");
const {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
} = require("../controllers/gig.controllers");

const router = express.Router();

router.get("/", getAllGigs);
router.get("/:id", getGig);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);

module.exports = router;
