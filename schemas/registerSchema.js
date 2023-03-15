const yup = require("yup");

const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Username is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Must be at least 4 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your Password"),
});

module.exports = registerSchema;
