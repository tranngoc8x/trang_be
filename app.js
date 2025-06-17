#!/usr/bin/env node
'use strict';

/**
 * Entry point thay thế cho sharehost
 * Sử dụng cách khởi động đơn giản hơn
 */

// Import Strapi
const { createStrapi, compileStrapi } = require('@strapi/strapi');

// Cấu hình môi trường
const config = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 1337,
  env: process.env.NODE_ENV || 'production'
};

console.log('🚀 Khởi động Strapi App...');
console.log(`📦 Cấu hình:`, config);

// Hàm khởi động chính
async function bootstrap() {
  try {
    // Compile Strapi
    console.log('⚙️  Đang compile...');
    const appContext = await compileStrapi();
    
    // Tạo Strapi instance
    console.log('🔧 Đang tạo Strapi instance...');
    const app = await createStrapi(appContext).load();
    
    // Khởi động server
    console.log('🌐 Đang khởi động server...');
    await app.start();
    
    console.log('✅ Ứng dụng đã sẵn sàng!');
    console.log(`🔗 URL: http://${config.host}:${config.port}`);
    
    return app;
    
  } catch (error) {
    console.error('❌ Lỗi khởi động:', error);
    process.exit(1);
  }
}

// Xử lý tín hiệu tắt
process.on('SIGTERM', () => {
  console.log('🛑 Đang tắt ứng dụng...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Đang tắt ứng dụng...');
  process.exit(0);
});

// Khởi động
bootstrap().catch(error => {
  console.error('💥 Lỗi nghiêm trọng:', error);
  process.exit(1);
});
