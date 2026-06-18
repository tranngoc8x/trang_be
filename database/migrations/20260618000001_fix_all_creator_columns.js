'use strict';

const TABLES_TO_CHECK = [
  'about_uses',
  'articles',
  'bao_gia_and_tu_vans',
  'globals',
  'home_page_contents',
  'khach_hangs',
  'products',
  'services',
  'slides',
  'static_pages',
  'menus'
];

exports.up = async function(knex) {
  const hasAdminUsers = await knex.schema.hasTable('admin_users');
  if (!hasAdminUsers) {
    console.log('admin_users table not found, skipping creator columns migration');
    return;
  }

  for (const tableName of TABLES_TO_CHECK) {
    const hasTable = await knex.schema.hasTable(tableName);
    if (!hasTable) {
      continue;
    }

    const hasCreatedBy = await knex.schema.hasColumn(tableName, 'created_by_id');
    if (!hasCreatedBy) {
      console.log(`Adding created_by_id column to ${tableName} table`);
      await knex.schema.alterTable(tableName, (table) => {
        table.integer('created_by_id').unsigned().nullable();
        table.foreign('created_by_id').references('id').inTable('admin_users').onDelete('SET NULL');
      });
    }

    const hasUpdatedBy = await knex.schema.hasColumn(tableName, 'updated_by_id');
    if (!hasUpdatedBy) {
      console.log(`Adding updated_by_id column to ${tableName} table`);
      await knex.schema.alterTable(tableName, (table) => {
        table.integer('updated_by_id').unsigned().nullable();
        table.foreign('updated_by_id').references('id').inTable('admin_users').onDelete('SET NULL');
      });
    }
  }
};

exports.down = async function(knex) {
  for (const tableName of TABLES_TO_CHECK) {
    const hasTable = await knex.schema.hasTable(tableName);
    if (!hasTable) {
      continue;
    }

    const hasCreatedBy = await knex.schema.hasColumn(tableName, 'created_by_id');
    const hasUpdatedBy = await knex.schema.hasColumn(tableName, 'updated_by_id');

    if (hasCreatedBy || hasUpdatedBy) {
      await knex.schema.alterTable(tableName, (table) => {
        if (hasCreatedBy) {
          table.dropForeign(['created_by_id']);
          table.dropColumn('created_by_id');
        }
        if (hasUpdatedBy) {
          table.dropForeign(['updated_by_id']);
          table.dropColumn('updated_by_id');
        }
      });
    }
  }
};
