const knex = require('knex');
const fs = require('fs-extra');
const path = require('path');
const dbConfig = require('../knexfile').development;

// Kết nối đến database
const db = knex(dbConfig);

async function createSchemaBackup() {
  try {
    console.log('Đang tạo migration backup cấu trúc database...');
    
    // Lấy danh sách tất cả các bảng
    const tables = await db.raw('SHOW TABLES');
    const tableNames = tables[0].map(table => Object.values(table)[0]);
    
    // Tạo tên file migration
    const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '').slice(0, 14);
    const migrationName = `${timestamp}_schema_backup`;
    const migrationsDir = path.join(__dirname, '../migrations');
    
    // Đảm bảo thư mục migrations tồn tại
    fs.ensureDirSync(migrationsDir);
    
    // Tạo nội dung file migration
    let migrationContent = `
exports.up = async function(knex) {
  // Tạo lại cấu trúc database
`;

    // Lấy cấu trúc của từng bảng
    for (const tableName of tableNames) {
      const createTableSql = await db.raw(`SHOW CREATE TABLE \`${tableName}\``);
      const createStatement = createTableSql[0][0]['Create Table'];
      
      migrationContent += `
  // Tạo bảng ${tableName}
  await knex.raw(\`${createStatement.replace(/`/g, '\\`')}\`);
`;
    }

    migrationContent += `
  return Promise.resolve();
};

exports.down = async function(knex) {
  // Xóa tất cả các bảng theo thứ tự ngược lại
`;

    // Thêm lệnh xóa bảng theo thứ tự ngược lại
    for (let i = tableNames.length - 1; i >= 0; i--) {
      migrationContent += `
  await knex.schema.dropTableIfExists('${tableNames[i]}');`;
    }

    migrationContent += `
  return Promise.resolve();
};
`;

    // Ghi file migration
    const migrationPath = path.join(migrationsDir, `${migrationName}.js`);
    fs.writeFileSync(migrationPath, migrationContent);
    
    console.log(`Đã tạo migration backup tại: ${migrationPath}`);
  } catch (error) {
    console.error('Lỗi khi tạo migration backup:', error);
  } finally {
    // Đóng kết nối database
    await db.destroy();
  }
}

createSchemaBackup();