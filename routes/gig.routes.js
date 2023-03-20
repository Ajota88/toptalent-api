const express = require("express");
const { verifyToken } = require("../middlewares/jwtVerification");
const {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
  getUserGigs,
} = require("../controllers/gig.controllers");
const gigSchema = require("../schemas/gigSchema");
const { schemaValidator } = require("../middlewares/schemaValidator");

const router = express.Router();

router.get("/", getAllGigs);
router.get("/user", verifyToken, getUserGigs);
router.get("/:id", getGig);
router.post("/", verifyToken, schemaValidator(gigSchema), createGig);
router.delete("/:id", verifyToken, deleteGig);
router.put("/:id", verifyToken, updateGig);

module.exports = router;
