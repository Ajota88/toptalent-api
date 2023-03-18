const yup = require("yup");

const reviewSchema = yup.object({
  desc: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .required("A description is required"),
  star: yup.number().integer().min(1).max(5),
});

module.exports = reviewSchema;
