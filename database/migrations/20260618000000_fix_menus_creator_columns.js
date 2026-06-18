'use strict';

exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('menus');
  if (!hasTable) return;

  const hasCreatedBy = await knex.schema.hasColumn('menus', 'created_by_id');
  if (!hasCreatedBy) {
    await knex.schema.alterTable('menus', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.foreign('created_by_id').references('id').inTable('admin_users').onDelete('SET NULL');
    });
  }

  const hasUpdatedBy = await knex.schema.hasColumn('menus', 'updated_by_id');
  if (!hasUpdatedBy) {
    await knex.schema.alterTable('menus', (table) => {
      table.integer('updated_by_id').unsigned().nullable();
      table.foreign('updated_by_id').references('id').inTable('admin_users').onDelete('SET NULL');
    });
  }
};

exports.down = async function(knex) {
  const hasTable = await knex.schema.hasTable('menus');
  if (!hasTable) return;

  await knex.schema.alterTable('menus', (table) => {
    table.dropForeign(['created_by_id']);
    table.dropColumn('created_by_id');
    table.dropForeign(['updated_by_id']);
    table.dropColumn('updated_by_id');
  });
};
