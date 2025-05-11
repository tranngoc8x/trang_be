// Lấy dữ liệu của bảng với phân trang
const pageSize = 1000;
let page = 0;
let hasMoreRows = true;
let migrationContent = '';
migrationContent += `
  // Thêm dữ liệu vào bảng ${tableName}
`;

while (hasMoreRows) {
  const rows = await db(tableName)
    .select('*')
    .limit(pageSize)
    .offset(page * pageSize);
  
  if (rows.length === 0) {
    hasMoreRows = false;
  } else {
    migrationContent += `
  await knex('${tableName}').insert(${JSON.stringify(rows, null, 2).replace(/"/g, '\'')});
`;
    page++;
  }
}