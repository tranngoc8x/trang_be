#!/usr/bin/env node
'use strict';

/**
 * Entry point production cho sharehost
 * Tối ưu hóa cho môi trường production
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

// Cấu hình production
process.env.NODE_ENV = 'production';

// Cấu hình memory và performance
process.env.NODE_OPTIONS = '--max-old-space-size=2048';

console.error('🚀 Starting Strapi in production mode...');

// Khởi động Strapi
async function startProduction() {
  try {
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).load();
    await app.start();
    console.error('✅ Strapi started successfully');
  } catch (error) {
    console.error('❌ Failed to start Strapi:', error);
    process.exit(1);
  }
}

startProduction();
