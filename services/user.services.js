const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");
const BadRequestError = require("../errors/badRequest");

const deleteUser = async (id) => {
  await db.delete().from("users").where("id", id);
};

const updateUser = async ({ userInfo, userId }) => {
  //uploading img to cloudinary

  let imgCloudinaryId = "";

  if (userInfo.img) {
    const upload = await cloudinary.uploader.upload(
      userInfo.img,
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

  const response = await db("users")
    .where("id", userId)
    .update({ ...userInfo, img: imgCloudinaryId })
    .returning("id");
  return response;
};

module.exports = {
  deleteUser,
  updateUser,
};
