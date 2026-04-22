# Laravel API Phase 1 - Hướng dẫn sử dụng

## Tổng quan

Đây là skeleton Laravel 11 được tạo để thay thế backend Strapi hiện tại, chạy song song và đọc/ghi trực tiếp trên DB MySQL `nhkacdnp_kachivina` mà **không thay đổi schema**.

## Cấu trúc đã tạo

### Models (app/Models/)
- `Product.php` - Sản phẩm
- `Service.php` - Dịch vụ  
- `Article.php` - Bài viết
- `StaticPage.php` - Trang tĩnh
- `GlobalSetting.php` - Cấu hình global
- `HomePageContent.php` - Nội dung trang chủ
- `BaoGiaAndTuVan.php` - Form liên hệ
- `File.php` - Media files
- `Concerns/InteractsWithStrapiMedia.php` - Trait xử lý media Strapi

### API Resources (app/Http/Resources/)
- `ProductResource.php`
- `ServiceResource.php`
- `ArticleResource.php`
- `StaticPageResource.php`
- `GlobalResource.php`
- `HomePageContentResource.php`
- `FileResource.php`

### Controllers (app/Http/Controllers/Api/)
- `ProductController.php`
- `ServiceController.php`
- `ArticleController.php`
- `StaticPageController.php`
- `GlobalController.php`
- `HomePageContentController.php`
- `BaoGiaAndTuVanController.php`

### Routes (routes/api.php)
9 endpoints Phase 1:
- `GET /api/products`
- `GET /api/products/{slug}`
- `GET /api/services`
- `GET /api/services/{slug}`
- `GET /api/articles`
- `GET /api/articles/{slug}`
- `GET /api/static-pages/{slug}`
- `GET /api/globals`
- `GET /api/home-page-contents`
- `POST /api/bao-gia-and-tu-vans` (có rate limit 10 req/phút)

## Cách chạy

### 1. Cấu hình môi trường
File `.env` đã được cấu hình kết nối DB:
```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nhkacdnp_kachivina
DB_USERNAME=root
DB_PASSWORD=root
```

### 2. Khởi động server
```bash
cd laravel_api
php artisan serve --host=127.0.0.1 --port=8001
```

### 3. Test endpoints
```bash
# Test services
curl http://127.0.0.1:8001/api/services

# Test products
curl http://127.0.0.1:8001/api/products

# Test globals
curl http://127.0.0.1:8001/api/globals

# Test form liên hệ
curl -X POST http://127.0.0.1:8001/api/bao-gia-and-tu-vans \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"Test","customer_phone":"0123456789","content":"Test message"}'
```

## Đã verify

✅ Kết nối DB thành công (đọc được 12 services, 10 products)  
✅ Routes đã đăng ký đúng (không bị double prefix)  
✅ Response format tương thích với Strapi (camelCase, ISO8601 dates)  
✅ Pagination hoạt động  
✅ Relations product ↔ service hoạt động  
✅ Rate limit cho form liên hệ đã bật

## Lưu ý quan trọng

### 1. Media/Files
- Hiện tại chưa eager load media trong response mặc định
- Để lấy media cần gọi method `image()`, `avatar()`, `cover()` từ model
- Có thể bổ sung sau khi xác định frontend cần populate media như thế nào

### 2. Components
- Các bảng `*_cmps` và `components_shared_*` chưa được xử lý
- Phase 1 chỉ trả về content chính
- Sẽ flatten components ở Phase 3

### 3. Không thay đổi DB
- Laravel **chỉ đọc/ghi** trên schema hiện tại
- Không chạy migration Laravel
- Không drop/alter bảng Strapi

### 4. Chạy song song với Strapi
- Laravel chạy port 8001
- Strapi vẫn chạy port 1337
- Frontend có thể test A/B bằng cách đổi base URL

## Bước tiếp theo

### Phase 2: Admin Panel
- Cài Filament hoặc Laravel Nova
- Tạo CRUD cho các content type
- Migrate admin users từ Strapi

### Phase 3: Flatten Components
- Xử lý dynamic zones
- Flatten SEO components
- Xử lý rich text/media components

### Phase 4: Cleanup
- Drop FK tới `admin_users`
- Drop các bảng Strapi internal
- Optimize indexes

## Rollback

Nếu cần rollback:
1. Dừng Laravel server
2. Đổi frontend base URL về Strapi
3. Không có thay đổi DB nên rollback an toàn 100%

## Bảo mật

⚠️ **Cần đổi ngay sau khi deploy production:**
- DB password hiện đang là `root/root`
- Tạo user MySQL riêng với quyền hạn chế
- Cấu hình CORS cho frontend domain
- Bật HTTPS
