#!/usr/bin/env node
'use strict';

/**
 * Entry point đơn giản nhất cho sharehost
 * Chỉ khởi động Strapi với cấu hình tối thiểu
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

// Khởi động Strapi với cấu hình mặc định
async function start() {
    try {
        const appContext = await compileStrapi();
        const app = await createStrapi(appContext).load();
        await app.start();
    } catch (error) {
        console.error('Error starting Strapi:', error);
        process.exit(1);
    }
}

start();
