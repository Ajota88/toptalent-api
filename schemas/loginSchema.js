const yup = require("yup");

const loginSchema = yup.object({
  user: yup.string().required("user is required"),
});

module.exports = loginSchema;
