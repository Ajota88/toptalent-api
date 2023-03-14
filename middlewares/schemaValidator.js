const yup = require("yup");

const schemaValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

module.exports = { schemaValidator };
