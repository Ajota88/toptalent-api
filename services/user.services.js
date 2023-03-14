const db = require("../db/db");

const deleteUser = async (id) => {
  await db.delete().from("users").where("id", id);
};

module.exports = {
  deleteUser,
};
