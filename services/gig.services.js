const db = require("../db/db");
const cloudinary = require("../cloudinary/cloudinary");
const BadRequestError = require("../errors/badRequest");
const UnauthenticatedError = require("../errors/unauthenticated");

const getAllGigs = async ({ cat, minPrice = 0, maxPrice, search, sort }) => {
  let order;
  if (sort === "created_at") {
    order = "asc";
  } else if (sort === "sales") {
    order = "desc";
  }

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
    })
    .orderBy(sort, order);

  /*  if (allGigs.length === 0) {
    throw new BadRequestError("No gigs found");
  } */
  return allGigs;
};

const getGig = async (gigId) => {
  const gig = await db("gigs")
    .join("users", "users.id", "=", "gigs.userId")
    .select("gigs.*", "users.username", "users.img")
    .where("gigs.id", gigId);

  if (!gig.length) {
    throw new BadRequestError("Gig not found");
  }

  return gig[0];
};

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

const deleteGig = async ({ userId, gigId }) => {
  const gig = await db.select("*").from("gigs").where("id", gigId);

  if (!gig.length) {
    throw new BadRequestError("Gig not found");
  }

  if (gig[0].userId !== userId) {
    throw new UnauthenticatedError("You can only delete your gigs");
  }

  const gigDeleted = await db("gigs").where("id", gigId).del().returning("id");
  return gigDeleted;
};

const getUserGigs = async (userId) => {
  const userGigs = await db("gigs").where("userId", userId);
  return userGigs;
};

const updateGig = async ({ gigInfo, gigId }) => {
  const response = await db("gigs").where("id", gigId).update(gigInfo);
  return response;
};

module.exports = {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
  getUserGigs,
  updateGig,
};
