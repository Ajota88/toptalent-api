const yup = require("yup");

const categorySchema = yup.object({
  name: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .required("Name is required"),
  cover: yup.string(),
});

module.exports = categorySchema;
