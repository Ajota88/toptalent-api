const CustomAPIError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
