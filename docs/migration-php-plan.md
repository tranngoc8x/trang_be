# Kế hoạch Migration Strapi → Laravel PHP

**Ngày:** 2026-04-22  
**Mục tiêu:** Chuyển toàn bộ backend từ Strapi (Node.js) sang Laravel (PHP) với thay đổi DB tối thiểu

---

## 1. Phân loại bảng trong DB hiện tại

### A. Bảng GIỮ NGUYÊN 100% (Content chính)

Các bảng này chứa dữ liệu nghiệp vụ thực tế, giữ nguyên schema:

| Bảng | Rows | Mô tả | Ghi chú |
|------|------|-------|---------|
| `products` | 10 | Sản phẩm | Có relation với services |
| `services` | 12 | Dịch vụ | |
| `articles` | 2 | Bài viết | |
| `static_pages` | 8 | Trang tĩnh | |
| `about_uses` | 10 | Giới thiệu | |
| `globals` | 1 | Cấu hình global | |
| `home_page_contents` | 2 | Nội dung trang chủ | |
| `slides` | 4 | Slider | |
| `khach_hangs` | 14 | Khách hàng/đối tác | Có media |
| `bao_gia_and_tu_vans` | 4 | Form báo giá/tư vấn | |
| `files` | 69 | Media files | |
| `menus` | 8 | Menu | Nếu đang dùng |

**Tổng: 12 bảng content chính**

---

### B. Bảng GIỮ TẠM - cần mapping (Relations & Components)

Các bảng này cần giữ để đọc dữ liệu, nhưng sẽ dần flatten/migrate:

| Bảng | Rows | Mô tả | Xử lý |
|------|------|-------|-------|
| `products_service_lnk` | 8 | Many-to-many products ↔ services | Giữ nguyên, Laravel pivot table |
| `files_related_mph` | 75 | Polymorphic media relations | Giữ tạm, có thể chuyển sang Laravel morphMany |
| `products_cmps` | 18 | Components của products | Flatten sang JSON hoặc bảng riêng |
| `static_pages_cmps` | 8 | Components của static_pages | Flatten sang JSON hoặc bảng riêng |
| `about_uses_cmps` | - | Components của about_uses | Flatten sang JSON hoặc bảng riêng |
| `globals_cmps` | - | Components của globals | Flatten sang JSON hoặc bảng riêng |
| `home_page_contents_cmps` | 10 | Components của home_page_contents | Flatten sang JSON hoặc bảng riêng |
| `articles_cmps` | - | Components của articles | Flatten sang JSON hoặc bảng riêng |
| `components_shared_seos` | 19 | SEO metadata | Có thể flatten vào bảng chính |
| `components_shared_articles` | 8 | Article components | Flatten |
| `components_shared_media` | - | Media components | Flatten |
| `components_shared_quotes` | - | Quote components | Flatten |
| `components_shared_rich_texts` | 9 | Rich text components | Flatten |
| `components_shared_sliders` | 8 | Slider components | Flatten |
| `components_shared_rich_texts_cmps` | - | Nested components | Flatten |

**Tổng: 15 bảng cần mapping**

---

### C. Bảng CÓ THỂ BỎ HOÀN TOÀN (Strapi internal)

Các bảng này là config/internal của Strapi, không cần cho Laravel:

#### C1. Strapi Core (BỎ)
- `strapi_core_store_settings` (46 rows) - config nội bộ Strapi
- `strapi_database_schema` - schema version
- `strapi_migrations` - migration history
- `strapi_migrations_internal` (6 rows) - internal migrations
- `strapi_history_versions` - version history
- `strapi_webhooks` - webhooks config

#### C2. Strapi Workflows (BỎ nếu không dùng)
- `strapi_workflows`
- `strapi_workflows_stages`
- `strapi_workflows_stage_required_to_publish_lnk`
- `strapi_workflows_stages_permissions_lnk`
- `strapi_workflows_stages_workflow_lnk`

#### C3. Strapi Releases (BỎ nếu không dùng)
- `strapi_releases`
- `strapi_release_actions`
- `strapi_release_actions_release_lnk`

#### C4. Strapi API Tokens (BỎ - Laravel có auth riêng)
- `strapi_api_tokens` (2 rows)
- `strapi_api_token_permissions` (21 rows)
- `strapi_api_token_permissions_token_lnk` (21 rows)

#### C5. Strapi Transfer Tokens (BỎ)
- `strapi_transfer_tokens`
- `strapi_transfer_token_permissions`
- `strapi_transfer_token_permissions_token_lnk`

**Tổng: ~18 bảng Strapi internal có thể BỎ**

---

### D. Bảng THAY THẾ bằng Laravel Auth (Admin & Users)

Các bảng này sẽ được thay bằng hệ auth Laravel:

#### D1. Admin Users (Thay bằng Laravel users + roles)
- `admin_users` (2 rows) - migrate sang `users` table Laravel
- `admin_roles` (4 rows) - migrate sang `roles` table (Spatie Permission)
- `admin_users_roles_lnk` (2 rows) - migrate sang `model_has_roles`
- `admin_permissions` (242 rows) - migrate sang `permissions` table
- `admin_permissions_role_lnk` (242 rows) - migrate sang `role_has_permissions`

#### D2. Users Permissions Plugin (Thay bằng Laravel Sanctum/Passport)
- `up_users` - frontend users, migrate sang `users` table
- `up_roles` - migrate sang `roles`
- `up_users_role_lnk` - migrate sang `model_has_roles`
- `up_permissions` (18 rows) - migrate sang `permissions`
- `up_permissions_role_lnk` (18 rows) - migrate sang `role_has_permissions`

**Tổng: 10 bảng auth cần MIGRATE sang Laravel**

---

### E. Bảng UPLOAD (Có thể đơn giản hóa)

- `upload_folders` - có thể bỏ nếu không cần folder structure
- `upload_folders_parent_lnk` - có thể bỏ
- `files_folder_lnk` - có thể bỏ

Hoặc giữ lại nếu Sếp muốn giữ cấu trúc folder.

---

### F. Bảng I18N (Giữ nếu cần đa ngôn ngữ)

- `i18n_locale` - nếu site đa ngôn ngữ thì giữ, không thì bỏ

---

## 2. Tổng kết phân loại

| Nhóm | Số bảng | Xử lý |
|------|---------|-------|
| **Content chính** | 12 | ✅ GIỮ NGUYÊN 100% |
| **Relations & Components** | 15 | 🔄 GIỮ TẠM, mapping dần |
| **Strapi internal** | 18 | ❌ BỎ HOÀN TOÀN |
| **Auth/Admin** | 10 | 🔄 MIGRATE sang Laravel |
| **Upload folders** | 3 | ⚠️ Tùy chọn |
| **I18N** | 1 | ⚠️ Tùy chọn |

**Tổng cộng: 59 bảng**

---

## 3. Chiến lược migration

### Giai đoạn 1: Setup Laravel + đọc DB cũ (Tuần 1)

1. **Tạo Laravel project mới**
   - Laravel 11.x
   - PHP 8.2+
   - MySQL connection tới DB hiện tại

2. **Tạo Model Laravel cho các bảng content chính**
   ```php
   // app/Models/Product.php
   class Product extends Model {
       protected $table = 'products';
       protected $fillable = ['title', 'slug', 'description', 'show_in_home'];
       
       // Relationships
       public function services() {
           return $this->belongsToMany(Service::class, 'products_service_lnk');
       }
       
       public function media() {
           return $this->morphToMany(File::class, 'related', 'files_related_mph');
       }
   }
   ```

3. **Clone API endpoints cho React frontend**
   - GET `/api/products`
   - GET `/api/products/{slug}`
   - GET `/api/services`
   - GET `/api/articles`
   - GET `/api/static-pages/{slug}`
   - POST `/api/bao-gia-and-tu-vans` (form liên hệ)
   - GET `/api/globals`
   - GET `/api/home-page-contents`

4. **Test API với React frontend**
   - Đảm bảo response format giống Strapi
   - Frontend không cần sửa code

---

### Giai đoạn 2: Xây admin Laravel (Tuần 2-3)

1. **Setup Laravel admin package**
   - Option 1: Laravel Nova (paid, đẹp)
   - Option 2: Filament (free, mạnh)
   - Option 3: Laravel Backpack (free/paid)

2. **Tạo CRUD cho các content type**
   - Products
   - Services
   - Articles
   - Static Pages
   - Slides
   - Khách hàng
   - Form báo giá

3. **Setup media library**
   - Spatie Media Library
   - Hoặc giữ logic đọc từ `files` table

4. **Setup auth**
   - Laravel Breeze/Jetstream
   - Spatie Permission cho roles/permissions
   - Migrate admin users từ `admin_users`

---

### Giai đoạn 3: Flatten components (Tuần 3-4)

1. **Xử lý SEO components**
   ```php
   // Thêm cột vào bảng chính
   ALTER TABLE products ADD COLUMN seo_title VARCHAR(255);
   ALTER TABLE products ADD COLUMN seo_description TEXT;
   ALTER TABLE products ADD COLUMN seo_keywords VARCHAR(255);
   
   // Hoặc dùng JSON
   ALTER TABLE products ADD COLUMN seo_meta JSON;
   ```

2. **Xử lý rich text components**
   - Flatten vào cột `content` hoặc `description`
   - Hoặc tạo bảng `product_sections` riêng

3. **Xử lý slider/media components**
   - Giữ relation qua `files_related_mph`
   - Hoặc tạo pivot table Laravel chuẩn

---

### Giai đoạn 4: Cleanup & optimize (Tuần 4-5)

1. **Drop các bảng Strapi internal**
   ```sql
   DROP TABLE IF EXISTS strapi_core_store_settings;
   DROP TABLE IF EXISTS strapi_database_schema;
   DROP TABLE IF EXISTS strapi_migrations;
   -- ... (18 bảng)
   ```

2. **Optimize indexes**
   - Thêm index cho các cột hay query
   - Xóa index không dùng

3. **Backup & test**
   - Full backup DB
   - Test toàn bộ chức năng
   - Load test API

---

## 4. Ước lượng thay đổi DB

### Thay đổi tối thiểu (Recommended)

- **Giữ nguyên:** 12 bảng content + 15 bảng relations = **27 bảng (45%)**
- **Bỏ:** 18 bảng Strapi internal = **18 bảng (30%)**
- **Migrate:** 10 bảng auth = **10 bảng (17%)**
- **Tùy chọn:** 4 bảng upload/i18n = **4 bảng (7%)**

**Kết luận: Giữ được ~45% schema, bỏ ~30%, migrate ~25%**

---

## 5. Tech stack đề xuất

### Backend
- **Framework:** Laravel 11.x
- **PHP:** 8.2+
- **Database:** MySQL 8.0+ (giữ nguyên)
- **Admin:** Filament 3.x (free, mạnh, đẹp)
- **Auth:** Laravel Sanctum + Spatie Permission
- **Media:** Spatie Media Library hoặc custom
- **API:** Laravel API Resources

### Frontend (giữ nguyên)
- React.js
- Chỉ cần đổi base URL API

---

## 6. Rủi ro & giải pháp

| Rủi ro | Giải pháp |
|---------|-----------|
| Components phức tạp khó flatten | Giữ tạm bảng cũ, đọc qua Eloquent accessor |
| Media relations phức tạp | Dùng Laravel morphMany/morphToMany |
| Frontend API response khác format | Dùng API Resources để format giống Strapi |
| Admin không đẹp bằng Strapi | Dùng Filament, customize theme |
| Performance kém hơn Node.js | Cache (Redis), optimize query, queue jobs |

---

## 7. Timeline tổng thể

| Giai đoạn | Thời gian | Deliverable |
|-----------|-----------|-------------|
| 1. Setup + API | 1 tuần | Laravel app + API working |
| 2. Admin | 2 tuần | Admin panel CRUD đầy đủ |
| 3. Flatten components | 1-2 tuần | DB sạch hơn, dễ maintain |
| 4. Cleanup | 1 tuần | Production ready |
| **TỔNG** | **5-6 tuần** | **Full migration** |

---

## 8. Checklist trước khi bắt đầu

- [ ] Backup đầy đủ DB hiện tại
- [ ] Backup thư mục `public/uploads`
- [ ] List đầy đủ API endpoints React đang gọi
- [ ] Xác nhận môi trường PHP production (version, extensions)
- [ ] Quyết định admin package (Filament/Nova/Backpack)
- [ ] Quyết định có giữ folder structure cho uploads không
- [ ] Quyết định có cần đa ngôn ngữ không

---

## 9. Bước tiếp theo

Nếu Sếp đồng ý phương án này, em sẽ:

1. **Tạo Laravel project mới**
2. **Generate Models cho 12 bảng content chính**
3. **Clone 5-10 API endpoints quan trọng nhất**
4. **Test với React frontend**

Sau đó mới tiến sang xây admin và flatten components.

---

**Kết luận:** Migration hoàn toàn khả thi, giữ được ~45% DB nguyên vẹn, thời gian 5-6 tuần.
