const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex({
  client: "pg",
  connection: {
    host: "dpg-cgcj7lm4dad6fr59ack0-a",
    database: "toptalentv2_db_6l8v",
    user: "toptalentv2_db_6l8v_user",
    password: "GoBSEJj1s1UH7ullevWshstetX4MbrQU",
  },

  migrations: {
    directory: "./db/migrations",
  },
});

module.exports = db;
