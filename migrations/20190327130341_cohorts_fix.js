exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};

exports.down = function(knex, Promise) {};
