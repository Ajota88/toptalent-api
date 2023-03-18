const orderServices = require("../services/order.services");

const createOrder = async (req, res, next) => {
  try {
    const { gigId } = req.params;
    const userId = req.userId;
    const response = await orderServices.createOrder({ gigId, userId });
    res.status(201).send("order created");
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const response = await orderServices.getUserOrders(req.userId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const paymentIntent = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { gigId } = req.params;

    const clientSecret = await orderServices.paymentIntent({ userId, gigId });
    res.status(201).send({ clientSecret });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const confirmPayment = async (req, res, next) => {
  try {
    const { payment_intent } = req.body;
    const response = await orderServices.confirmPayment(payment_intent);
    res.status(202).send("Payment confirm");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  paymentIntent,
  confirmPayment,
};
