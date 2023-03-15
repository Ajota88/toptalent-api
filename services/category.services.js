const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");
const BadRequestError = require("../errors/badRequest");

const createCategory = async ({ name, cover }) => {
  //CHECK IF CATEGORY EXISTS
  const categoryFound = await db("categories").where(
    "name",
    name.toLowerCase()
  );

  if (categoryFound.length) throw new BadRequestError("Category already exits");

  let coverCloudinaryId = "";

  if (cover) {
    const upload = await cloudinary.uploader.upload(
      cover,
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
    coverCloudinaryId = upload.public_id;
  }

  const newCategory = await db("categories")
    .insert({ name: name.toLowerCase(), cover: coverCloudinaryId })
    .returning("id");
  return newCategory;
};

const getAllCategories = async () => {
  const categories = await db.select("*").from("categories");
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};
