const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) throw new Error("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).send("Token is not valid");
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = {
  verifyToken,
};
