const db = require("../db/db");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary/cloudinary");
const BadRequestError = require("../errors/badRequest");

const register = async (user) => {
  //CHECK IF USER EXISTS
  const userFound = await db("users")
    .where("username", user.username)
    .orWhere("email", user.email);

  if (userFound.length) throw new BadRequestError("User already exits");

  //HASHING PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  //uploading img to cloudinary

  let imgCloudinaryId = "";

  if (user.img) {
    const upload = await cloudinary.uploader.upload(
      user.img,
      {
        upload_preset: "unsigned_upload",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      },
      function (error, result) {
        if (error) {
          console.log(error);
        }
      }
    );
    imgCloudinaryId = upload.public_id;
  }

  const newUser = await db("users")
    .insert({
      ...user,
      password: hash,
      img: imgCloudinaryId,
    })
    .returning("id");

  return newUser;
};

const login = async ({ username, password }) => {
  //CHECK IF USER IS REGISTERED
  const userFound = await db("users").where("username", username);
  if (userFound.length === 0) throw new BadRequestError("User not Found");

  //CHECK PASSWORD
  const isPasswordCorrect = await bcrypt.compare(
    password,
    userFound[0].password
  );
  if (!isPasswordCorrect)
    throw new BadRequestError("Wrong username or password");
  const { password: userPassword, ...response } = userFound[0];
  return response;
};

const getUserInfo = async (userId) => {
  const user = await db("users").where("id", userId);
  const { password: userPassword, ...response } = user[0];
  return response;
};

module.exports = {
  register,
  login,
  getUserInfo,
};
