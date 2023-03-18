const express = require("express");
const { verifyToken } = require("../middlewares/jwtVerification");
const {
  createOrder,
  getUserOrders,
  paymentIntent,
  confirmPayment,
} = require("../controllers/order.controllers");

const router = express.Router();

router.get("/", verifyToken, getUserOrders);
router.post("/:gigId", verifyToken, createOrder);
router.post("/payment-intent/:gigId", verifyToken, paymentIntent);
router.put("/", verifyToken, confirmPayment);

module.exports = router;
