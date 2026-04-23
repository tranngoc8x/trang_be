# Laravel Dashboard Admin

- [x] Admin login works at /admin/login
- [x] Dashboard loads after authentication
- [x] Global settings editable
- [x] Static pages CRUD works
- [x] Products/services/articles list and edit work
- [x] Slides/khach-hangs/about-uses list and edit work
- [x] Menus list and edit work
- [x] Leads list works

## Cài đặt

```bash
cd laravel_api
composer require filament/filament:"^3.2" livewire/livewire:"^3.0"
php artisan filament:install --panels
php artisan db:seed --class=AdminUserSeeder
php artisan serve --host=127.0.0.1 --port=8001
```

## Truy cập

- URL: `http://127.0.0.1:8001/admin`
- Email: `admin@example.com`
- Password: `password`

## Các màn hình chính

- `/admin`
- `/admin/global-settings`
- `/admin/static-pages`
- `/admin/products`
- `/admin/services`
- `/admin/articles`
- `/admin/slides`
- `/admin/khach-hangs`
- `/admin/about-uses`
- `/admin/menus`
- `/admin/bao-gia-and-tu-vans`

## Verification commands

```bash
cd laravel_api
php artisan test tests/Feature/Filament
php artisan route:list --path=admin
```

## Ghi chú triển khai

- Dashboard dùng Filament 3 trên Laravel 11.
- `AboutUsResource` dùng slug tường minh `about-uses` để khớp naming hiện tại của project.
- Media trong phase này mới dừng ở mức preview/read-only qua placeholder cho `Product.image`, `Product.avatar`, `Service.image`, `Article.cover`, `Slide.image`, `KhachHang.logo`.
- `BaoGiaAndTuVanResource` hiện cho phép CRUD cơ bản theo resource generator pattern; nếu muốn khóa create thủ công cho lead thì có thể siết tiếp ở bước sau bằng `canCreate(): false`.
