/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("gigs", (table) => {
    table.dropColumn("sales");
  });
  return knex.schema.alterTable("gigs", (table) => {
    table.integer("sales").defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("gigs", (table) => {
    table.dropColumn("sales");
  });
  return knex.schema.alterTable("gigs", (table) => {
    table.integer("sales");
  });
};
