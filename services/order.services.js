const db = require("../db/db");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//For Testing,before stripe configuration
const createOrder = async ({ gigId, userId }) => {
  const gig = await db.select("*").from("gigs").where("id", gigId);
  const newOrder = await db("orders")
    .insert({
      gigId,
      price: gig[0].price,
      buyerId: userId,
      sellerId: gig[0].userId,
      img: gig[0].cover,
    })
    .returning("id");

  return newOrder;
};

const getUserOrders = async (userId) => {
  const userOrders = await db.select("*").from("orders").where({
    buyerId: userId,
    isCompleted: true,
  });

  return userOrders;
};

const paymentIntent = async ({ gigId, userId }) => {
  const gig = await db.select("*").from("gigs").where("id", gigId);

  const payment = await stripe.paymentIntents.create({
    amount: gig[0].price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = await db("orders")
    .insert({
      gigId,
      price: gig[0].price,
      buyerId: userId,
      sellerId: gig[0].userId,
      payment_intent: payment.id,
      title: gig[0].title,
      img: gig[0].cover,
    })
    .returning("id");

  return payment.client_secret;
};

const confirmPayment = async (paymentIntent) => {
  const orderUpdated = await db("orders")
    .where("payment_intent", paymentIntent)
    .update({ isCompleted: true })
    .returning("id");

  return orderUpdated;
};

module.exports = {
  createOrder,
  getUserOrders,
  paymentIntent,
  confirmPayment,
};
