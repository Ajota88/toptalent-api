const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");

const getAllGigs = async ({ cat, minPrice = 0, maxPrice, search }) => {
  const allGigs = await db("gigs")
    .join("users", "users.id", "=", "gigs.userId")
    .join("categories", "gigs.categoryId", "=", "categories.id")
    .select(
      "gigs.*",
      "users.username",
      "users.img",
      "categories.cover as categoryCover",
      "categories.name as category"
    )
    .where(function () {
      if (cat) {
        this.where("categoryId", cat);
      }
      if (minPrice) {
        this.where("price", ">", minPrice);
      }
      if (maxPrice) {
        this.where("price", "<", maxPrice);
      }
      if (search) {
        this.where("title", "ilike", `%${search}%`);
      }
    });

  if (!allGigs) {
    throw new Error("No gigs found");
  }
  return allGigs;
};

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
    .insert({
      ...gigInfo,
      cover: coverCloudinaryId,
      features: JSON.stringify(gigInfo.features),
    })
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
