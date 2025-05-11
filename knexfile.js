// ./knexfile.js
module.exports = {
    development: {
      client: 'mysql2', // Sử dụng mysql2 (khuyến nghị)
      connection: {
        host: 'localhost',
        port: 3306,
        database: 'trang_db',
        user: 'root',
        password: 'root',
      },
      migrations: {
        directory: './migrations', // Thư mục chứa các file migration
      },
    },
    // Có thể thêm cấu hình cho staging/production nếu cần
  };