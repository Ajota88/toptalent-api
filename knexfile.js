// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "pg",
  connection: {
    host: "dpg-cgcj7lm4dad6fr59ack0-a",
    database: "toptalentv2_db_6l8v",
    user: "toptalentv2_db_6l8v_user",
    password: "GoBSEJj1s1UH7ullevWshstetX4MbrQU",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./db/migrations",
  },
};
