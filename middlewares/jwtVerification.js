const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) throw new UnauthenticatedError("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      throw new UnauthenticatedError("Token is not valid");
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = {
  verifyToken,
};
