<?php

use Illuminate\Support\Facades\Route;

// API routes cho Phase 1 - clone Strapi endpoints
// Prefix: /api

// Products
Route::get('/products', [\App\Http\Controllers\Api\ProductController::class, 'index']);
Route::get('/products/{slug}', [\App\Http\Controllers\Api\ProductController::class, 'show']);

// Services
Route::get('/services', [\App\Http\Controllers\Api\ServiceController::class, 'index']);
Route::get('/services/{slug}', [\App\Http\Controllers\Api\ServiceController::class, 'show']);

// Articles
Route::get('/articles', [\App\Http\Controllers\Api\ArticleController::class, 'index']);
Route::get('/articles/{slug}', [\App\Http\Controllers\Api\ArticleController::class, 'show']);

// Static Pages
Route::get('/static-pages', [\App\Http\Controllers\Api\StaticPageController::class, 'index']);
Route::get('/static-pages/{slug}', [\App\Http\Controllers\Api\StaticPageController::class, 'show']);

// Global settings
Route::get('/global', [\App\Http\Controllers\Api\GlobalController::class, 'show']);
Route::get('/globals', [\App\Http\Controllers\Api\GlobalController::class, 'show']);

// Home page content
Route::get('/home-page-content', [\App\Http\Controllers\Api\HomePageContentController::class, 'show']);
Route::get('/home-page-contents', [\App\Http\Controllers\Api\HomePageContentController::class, 'show']);

// Tree menus
Route::get('/tree-menus/{slug}', [\App\Http\Controllers\Api\MenuController::class, 'index']);
Route::get('/tree-menus/{slug}/{id}', [\App\Http\Controllers\Api\MenuController::class, 'show']);

// Slides
Route::get('/slides', [\App\Http\Controllers\Api\SlideController::class, 'index']);
Route::get('/slides/{id}', [\App\Http\Controllers\Api\SlideController::class, 'show']);

// Khách hàng
Route::get('/khach-hangs', [\App\Http\Controllers\Api\KhachHangController::class, 'index']);
Route::get('/khach-hangs/{id}', [\App\Http\Controllers\Api\KhachHangController::class, 'show']);

// About uses
Route::get('/about-uses', [\App\Http\Controllers\Api\AboutUsController::class, 'index']);
Route::get('/about-uses/{id}', [\App\Http\Controllers\Api\AboutUsController::class, 'show']);

// Form liên hệ - có rate limit
Route::get('/bao-gia-and-tu-vans', [\App\Http\Controllers\Api\BaoGiaAndTuVanController::class, 'index']);
Route::post('/bao-gia-and-tu-vans', [\App\Http\Controllers\Api\BaoGiaAndTuVanController::class, 'store'])
    ->middleware('throttle:10,1'); // 10 requests/phút

