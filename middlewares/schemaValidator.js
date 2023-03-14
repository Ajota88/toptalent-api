const yup = require("yup");

const schemaValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = { schemaValidator };
