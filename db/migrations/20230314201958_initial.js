/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.text("img");
      table.text("desc");
      table.string("country");
      table.string("phone");
      table.boolean("isSeller").defaultTo(false);
      table.timestamps(true, true);
    }),
    knex.schema.createTable("categories", (table) => {
      table.increments();
      table.string("name").notNullable().unique();
      table.string("cover");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("gigs", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("desc").notNullable();
      table.integer("totalStars").defaultTo(0);
      table.integer("totalReviews").defaultTo(0);
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("categoryId")
        .unsigned()
        .references("id")
        .inTable("categories")
        .notNullable()
        .onDelete("CASCADE");
      table.integer("price");
      table.text("cover");
      table.string("shortTitle");
      table.string("shortDesc");
      table.integer("deliveryTime");
      table.integer("revisionNumber");
      table.integer("sales");
      table.json("features");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("reviews", (table) => {
      table.increments();
      table
        .integer("gigId")
        .unsigned()
        .references("id")
        .inTable("gigs")
        .notNullable();
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table.integer("star").notNullable();
      table.text("desc");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("orders", (table) => {
      table.increments();
      table.string("title");
      table
        .integer("gigId")
        .unsigned()
        .references("id")
        .inTable("gigs")
        .notNullable();
      table.integer("price");
      table
        .integer("buyerId")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onDelete("CASCADE");
      table
        .integer("sellerId")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("payment_intent");
      table.boolean("isCompleted").defaultTo(false);
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([
    knex.schema.dropTable("users"),
    knex.schema.dropTable("gigs"),
    knex.schema.dropTable("categories"),
    knex.schema.dropTable("reviews"),
    knex.schema.dropTable("orders"),
  ]);
};
