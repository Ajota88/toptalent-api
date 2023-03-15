const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");

const getAllGigs = async ({ cat, minPrice = 0, maxPrice, search }) => {};

const getGig = async (gigId) => {};

const createGig = async (gigInfo) => {
  //uploading img to cloudinary

  let coverCloudinaryId = "";

  if (gigInfo.cover) {
    const upload = await cloudinary.uploader.upload(
      gigInfo.cover,
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

  const newGig = await db("gigs")
    .insert({ ...gigInfo, cover: coverCloudinaryId })
    .returning("id");
  return newGig;
};

const deleteGig = async ({ userId, gigId }) => {};

module.exports = {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
};
