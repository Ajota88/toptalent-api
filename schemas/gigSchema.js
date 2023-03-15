const yup = require("yup");

const gigSchema = yup.object({
  title: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .required("Title is required"),
  desc: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .required("A description is required"),
  price: yup.number().required("Price is required"),
  categoryId: yup.number().required("A category is required"),
});

module.exports = gigSchema;
