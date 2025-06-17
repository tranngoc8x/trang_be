#!/usr/bin/env node
'use strict';

/**
 * Entry point chính cho sharehost
 * Khởi động ứng dụng Strapi
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

// Cấu hình môi trường mặc định
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.PORT = process.env.PORT || '1337';

// Cấu hình database mặc định nếu không có
if (!process.env.DATABASE_CLIENT) {
  process.env.DATABASE_CLIENT = 'mysql';
}

// Log thông tin khởi động
console.log('🚀 Đang khởi động Strapi...');
console.log(`📍 Môi trường: ${process.env.NODE_ENV}`);
console.log(`🌐 Host: ${process.env.HOST}`);
console.log(`🔌 Port: ${process.env.PORT}`);
console.log(`💾 Database: ${process.env.DATABASE_CLIENT}`);

// Xử lý lỗi không được bắt
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Xử lý tín hiệu tắt ứng dụng
process.on('SIGTERM', () => {
  console.log('🛑 Nhận tín hiệu SIGTERM, đang tắt ứng dụng...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Nhận tín hiệu SIGINT, đang tắt ứng dụng...');
  process.exit(0);
});

// Khởi động Strapi
async function startStrapi() {
  try {
    console.log('⚙️  Đang compile Strapi...');
    const appContext = await compileStrapi();

    console.log('🔧 Đang tạo instance Strapi...');
    const app = await createStrapi(appContext).load();

    console.log('🚀 Đang khởi động server...');
    await app.start();

    console.log('✅ Strapi đã khởi động thành công!');
    console.log(`🌍 Ứng dụng đang chạy tại: http://${process.env.HOST}:${process.env.PORT}`);
    console.log(`🔧 Admin panel: http://${process.env.HOST}:${process.env.PORT}/admin`);

  } catch (error) {
    console.error('❌ Lỗi khi khởi động Strapi:', error);
    process.exit(1);
  }
}

// Bắt đầu ứng dụng
startStrapi();
