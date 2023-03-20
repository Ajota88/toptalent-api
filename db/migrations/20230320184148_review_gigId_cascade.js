/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("reviews", (table) => {
    table.dropColumn("gigId");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("reviews", (table) => {
    table
      .integer("gigId")
      .unsigned()
      .references("id")
      .inTable("gigs")
      .notNullable();
  });
};
