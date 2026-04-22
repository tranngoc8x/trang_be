# Spec: Compatibility Layer cho Static Pages, Globals, Home Page Content

**Ngày:** 2026-04-22  
**Phạm vi:** Laravel API Phase 2 - Compatibility layer cho 3 endpoint content còn lại

## Context

Phase 1 đã hoàn tất các endpoint `products`, `services`, `articles` với media auto-populate và tối ưu N+1 query. Phase 2 tập trung vào 3 endpoint content còn lại để frontend React có thể đổi hẳn sang Laravel với **ít sửa client nhất**.

Mục tiêu chính:
- Bám sát contract thực tế trong `API_REFERENCE.md` (đã verify với Strapi production)
- Giữ nguyên naming field theo Strapi/frontend hiện tại (snake_case cho nested/component)
- Flatten component/SEO/media theo mức frontend đang dùng trước
- Không đổi schema DB
- Hỗ trợ query `populate`, `filters`, `locale` ở mức thực dụng

## Chiến lược triển khai

### Nguyên tắc "Cân bằng"
- Giữ shape gần Strapi ở field cốt lõi
- Component/SEO/media flatten theo mức frontend đang dùng trước
- Phần sâu/ít dùng làm bổ sung sau

### Thứ tự ưu tiên
1. `GET /api/global?populate=*` (single-type, đã verify contract)
2. `GET /api/home-page-content?locale=vi&populate=*` (single-type, đã verify contract)
3. `GET /api/static-pages?filters[slug][$eq]=...&populate=*` (collection, verify pattern)

## Thiết kế chi tiết

### 1. Global Config (`/api/global`)

#### Request thực tế frontend đang gọi
```bash
GET /api/global?populate=*
```

#### Response shape cần đạt (theo API_REFERENCE.md verified)
```json
{
  "data": {
    "id": 1,
    "documentId": "w28pd454smd6klrfbnllxsz3",
    "siteName": "Kachi Vina - Hotline: 0818 98 32 38",
    "createdAt": "2025-05-05T09:44:00.087Z",
    "updatedAt": "2026-01-21T16:38:46.942Z",
    "publishedAt": "2026-01-21T16:38:46.887Z",
    "map": "https://www.google.com/maps/embed?...",
    "footer_content": "<p>© 2025 Kachivina.vn. All rights reserved</p>",
    "favicon": {
      "id": 55,
      "documentId": "kufs3obnkk62xk3camgyu4ex",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_512febadbd.png"
    },
    "defaultSeo": {
      "id": 1,
      "metaTitle": "Kachi Vina - Gia công cơ khí chính xác...",
      "metaDescription": "Công ty TNHH Kachi Vina chuyên gia công cơ khí..."
    },
    "logo": {
      "id": 58,
      "documentId": "kn7p7b8g72gl6cnjed42vbv8",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_4f4d013907.png"
    },
    "logo2": {
      "id": 58,
      "documentId": "kn7p7b8g72gl6cnjed42vbv8",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_4f4d013907.png"
    }
  },
  "meta": {}
}
```

#### Cấu trúc DB cần đọc
- Bảng chính: `globals`
- Media trực tiếp: `files_related_mph` (join theo `related_type = 'api::global.global'`, `field = 'favicon'/'logo'/'logo2'`)
- Component link: `globals_cmps` (join theo `entity_id = globals.id`, `field = 'defaultSeo'`)
- Component data: `components_shared_seos` (join theo `cmp_id`)
- Media SEO: `files_related_mph` (join theo `related_type = 'shared.seo'`, `field = 'shareImage'`)

#### Thay đổi cần làm

**File:** `laravel_api/routes/api.php`
- Thêm route `/api/global` (không có `s`) để match contract frontend
- Giữ route cũ `/api/globals` để backward compatible nội bộ nếu cần

**File:** `laravel_api/app/Models/GlobalSetting.php`
- Thêm method `favicon()` → trả `File|null`
- Thêm method `logo()` → trả `File|null`
- Thêm method `logo2()` → trả `File|null`
- Thêm method `defaultSeo()` → trả object SEO đã flatten hoặc `null`
- Method `defaultSeo()` cần:
  - Join `globals_cmps` theo `entity_id`, `field='defaultSeo'`
  - Join `components_shared_seos` theo `cmp_id`
  - Lấy `shareImage` từ `files_related_mph` nếu có

**File:** `laravel_api/app/Http/Resources/GlobalResource.php`
- Thêm field `favicon`, `logo`, `logo2` (dùng `FileResource`)
- Thêm field `defaultSeo` (object inline hoặc null)
- Giữ naming `footer_content` (snake_case) thay vì `footerContent`
- Output `defaultSeo` shape:
  ```json
  {
    "id": 1,
    "metaTitle": "...",
    "metaDescription": "...",
    "shareImage": { FileResource } hoặc null
  }
  ```

**File:** `laravel_api/app/Http/Controllers/Api/GlobalController.php`
- Preload media cho `favicon`, `logo`, `logo2` trước khi trả resource
- Preload SEO component nếu có
- Giữ logic trả `data: null` nếu không có bản ghi

#### Lỗi biên
- Nếu không có bản ghi `globals`: `{ data: null, meta: {} }`
- Nếu `defaultSeo` không có: field `defaultSeo: null`
- Nếu media không có: field tương ứng `null`

---

### 2. Home Page Content (`/api/home-page-content`)

#### Request thực tế frontend đang gọi
```bash
GET /api/home-page-content?locale=vi&populate=*
```

#### Response shape cần đạt (theo API_REFERENCE.md verified)
```json
{
  "data": {
    "id": 19,
    "documentId": "bujyoup8zltuk9akof58tuct",
    "createdAt": "2025-05-10T15:48:17.337Z",
    "updatedAt": "2026-01-19T10:43:09.038Z",
    "publishedAt": "2026-01-19T10:43:09.194Z",
    "partner": {
      "id": 69,
      "title": "Đối tác của chúng tôi",
      "description": ""
    },
    "service": {
      "id": 70,
      "title": "Sản phẩm & Dịch vụ",
      "button_link": "/san-pham-dich-vu",
      "button_name": "Xem thêm"
    },
    "aboutus": {
      "id": 71,
      "title": "Về công ty",
      "button_link": "/gioi-thieu",
      "description": "<p>...</p>",
      "button_name": "Chi tiết"
    },
    "news": {
      "id": 72,
      "button_link": "/news",
      "button_name": "Read more"
    },
    "company_achievement": {
      "id": 45,
      "title": null,
      "description": ""
    }
  },
  "meta": {}
}
```

#### Cấu trúc DB cần đọc
- Bảng chính: `home_page_contents`
- Component link: `home_page_contents_cmps` (join theo `entity_id`, `field = 'partner'/'service'/'aboutus'/'news'/'company_achievement'`)
- Component data:
  - `components_shared_articles` (cho partner/service/aboutus/news)
  - `components_shared_rich_texts` (cho company_achievement)
- Media: `files_related_mph` (join theo `related_type = 'shared.article'`, `field = 'media'`)

**Lưu ý:** Response thực tế cho thấy các component chỉ trả field cơ bản, **không có media** trong contract hiện tại. Vậy Phase 2 chỉ cần flatten đúng các field text trước, media component để sau nếu frontend cần.

#### Thay đổi cần làm

**File:** `laravel_api/routes/api.php`
- Giữ route `/api/home-page-contents` hiện tại
- **Quan trọng:** Đổi endpoint này từ **collection paginate** sang **single-type** để match contract frontend

**File:** `laravel_api/app/Models/HomePageContent.php`
- Thêm method `partner()` → trả object article component hoặc `null`
- Thêm method `service()` → trả object article component hoặc `null`
- Thêm method `aboutus()` → trả object article component hoặc `null`
- Thêm method `news()` → trả object article component hoặc `null`
- Thêm method `companyAchievement()` → trả object rich-text component hoặc `null`
- Mỗi method cần:
  - Join `home_page_contents_cmps` theo `entity_id`, `field`
  - Join `components_shared_articles` hoặc `components_shared_rich_texts` theo `cmp_id`
  - Trả đúng shape: `id`, `title`, `description`, `button_link`, `button_name`

**File:** `laravel_api/app/Http/Resources/HomePageContentResource.php`
- Thêm field `partner`, `service`, `aboutus`, `news`, `company_achievement`
- Giữ naming snake_case cho nested fields: `button_link`, `button_name`, `company_achievement`
- Output shape cho mỗi component article:
  ```json
  {
    "id": 69,
    "title": "...",
    "description": "...",
    "button_link": "/...",
    "button_name": "..."
  }
  ```

**File:** `laravel_api/app/Http/Controllers/Api/HomePageContentController.php`
- **Đổi logic từ paginate sang single-type:**
  - Query lấy bản ghi published đầu tiên (hoặc theo `locale` nếu hỗ trợ)
  - Trả `data: object` hoặc `data: null` nếu không có
  - `meta: {}`
- Preload các component trước khi trả resource

#### Lỗi biên
- Nếu không có bản ghi: `{ data: null, meta: {} }`
- Nếu component không có: field tương ứng `null`

---

### 3. Static Pages (`/api/static-pages`)

#### Request thực tế frontend đang gọi
```bash
GET /api/static-pages?filters[slug][$eq]=gioi-thieu&populate=*
```

#### Response shape cần đạt (theo API_REFERENCE.md pattern)
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "...",
      "title": "Giới thiệu",
      "slug": "gioi-thieu",
      "content": "<p>...</p>",
      "createdAt": "...",
      "updatedAt": "...",
      "publishedAt": "...",
      "locale": "vi",
      "SEO": {
        "id": 1,
        "metaTitle": "...",
        "metaDescription": "...",
        "shareImage": { FileResource } hoặc null
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

Nếu không match: `data: []`, `meta.pagination.total: 0`

#### Cấu trúc DB cần đọc
- Bảng chính: `static_pages`
- Component link: `static_pages_cmps` (join theo `entity_id`, `field = 'SEO'`)
- Component data: `components_shared_seos` (join theo `cmp_id`)
- Media SEO: `files_related_mph` (join theo `related_type = 'shared.seo'`, `field = 'shareImage'`)

#### Thay đổi cần làm

**File:** `laravel_api/routes/api.php`
- Giữ route collection `/api/static-pages` hiện tại
- Có thể giữ route detail `/api/static-pages/{slug}` để tiện nội bộ

**File:** `laravel_api/app/Models/StaticPage.php`
- Thêm method `seo()` → trả object SEO đã flatten hoặc `null`
- Method `seo()` cần:
  - Join `static_pages_cmps` theo `entity_id`, `field='SEO'`
  - Join `components_shared_seos` theo `cmp_id`
  - Lấy `shareImage` từ `files_related_mph` nếu có

**File:** `laravel_api/app/Http/Resources/StaticPageResource.php`
- Thêm field `SEO` (object inline hoặc null)
- Giữ naming `SEO` (uppercase) theo contract frontend
- Output `SEO` shape:
  ```json
  {
    "id": 1,
    "metaTitle": "...",
    "metaDescription": "...",
    "shareImage": { FileResource } hoặc null
  }
  ```

**File:** `laravel_api/app/Http/Controllers/Api/StaticPageController.php`
- **Thêm method `index()` để hỗ trợ collection endpoint:**
  - Parse query `filters[slug][$eq]` từ request
  - Query theo slug nếu có filter
  - Paginate kết quả
  - Preload SEO component trước khi trả resource
  - Trả `data: []` nếu không match
- Giữ method `show(slug)` hiện tại để backward compatible

#### Lỗi biên
- Nếu không match filter: `{ data: [], meta.pagination.total: 0 }`
- Nếu `SEO` không có: field `SEO: null`

---

## Kiến trúc chung

### Lớp Resolver (Component/SEO/Media)

Để tránh lặp code, tạo các helper/resolver dùng chung:

**File:** `laravel_api/app/Models/Concerns/ResolvesComponents.php`
- Method `resolveComponent(string $field, string $componentType)` → trả object component đã flatten
- Logic chung:
  1. Join `{table}_cmps` theo `entity_id`, `field`
  2. Join `components_shared_{type}` theo `cmp_id`
  3. Trả object với các field cần thiết

**File:** `laravel_api/app/Models/Concerns/ResolvesSeo.php`
- Method `resolveSeo(string $field = 'SEO')` → trả object SEO đã flatten
- Logic:
  1. Gọi `resolveComponent($field, 'seos')`
  2. Lấy `shareImage` từ `files_related_mph` nếu có
  3. Trả object: `id`, `metaTitle`, `metaDescription`, `shareImage`

Các model `GlobalSetting`, `StaticPage`, `HomePageContent` sẽ `use` các trait này.

### Preload Strategy

Để tránh N+1 query:
- Controller preload media trước khi trả resource (dùng pattern đã có từ Phase 1)
- Component/SEO preload theo batch nếu có nhiều items (ít khả năng xảy ra với single-type)

### Naming Convention

**Quan trọng:** Với nhóm endpoint compatibility này, giữ nguyên naming theo Strapi/frontend:
- `footer_content` (không phải `footerContent`)
- `button_link`, `button_name` (không phải `buttonLink`, `buttonName`)
- `company_achievement` (không phải `companyAchievement`)
- `defaultSeo`, `SEO` (giữ nguyên case)

Lý do: mục tiêu là frontend đổi sang Laravel với **ít sửa client nhất**.

---

## Verification Plan

### Bộ test tối thiểu

1. **Global endpoint:**
   ```bash
   curl http://127.0.0.1:8001/api/global?populate=*
   ```
   - Check: `siteName`, `map`, `footer_content`, `favicon`, `logo`, `logo2`, `defaultSeo`
   - Check: media object có `id`, `documentId`, `name`, `url`
   - Check: `defaultSeo` có `metaTitle`, `metaDescription`

2. **Home page content endpoint:**
   ```bash
   curl http://127.0.0.1:8001/api/home-page-content?locale=vi&populate=*
   ```
   - Check: response là single object, không phải array
   - Check: `partner`, `service`, `aboutus`, `news`, `company_achievement`
   - Check: nested fields có `button_link`, `button_name`

3. **Static pages endpoint:**
   ```bash
   curl "http://127.0.0.1:8001/api/static-pages?filters[slug][\$eq]=gioi-thieu&populate=*"
   ```
   - Check: response là array
   - Check: `SEO` object nếu có
   - Check: case không match trả `data: []`

### So sánh với Strapi production

Dùng `API_REFERENCE.md` làm baseline:
- So key-level shape (không chỉ check HTTP 200)
- Verify naming field đúng (snake_case vs camelCase)
- Verify media object structure
- Verify pagination structure

### Syntax check

Sau mỗi file sửa:
```bash
php -l <file_path>
```

---

## Rủi ro và giảm thiểu

### 1. Component link có thể null hoặc nhiều records
- **Rủi ro:** `*_cmps` có thể có nhiều component cùng field (ví dụ repeatable)
- **Giảm thiểu:** Lấy record đầu tiên theo `order` ASC; nếu frontend cần nhiều items thì bổ sung sau

### 2. Media shareImage có thể không có
- **Rủi ro:** SEO component có thể không có `shareImage`
- **Giảm thiểu:** Trả `shareImage: null` thay vì bỏ field

### 3. Locale handling chưa đầy đủ
- **Rủi ro:** Frontend gửi `locale=vi` nhưng Laravel chưa filter theo locale
- **Giảm thiểu:** Phase 2 chỉ cần trả bản ghi published, chưa cần filter locale chặt; bổ sung sau nếu frontend thật sự cần

### 4. Populate wildcard `*` chưa hỗ trợ đầy đủ
- **Rủi ro:** Frontend gửi `populate=*` nhưng Laravel không biết populate gì
- **Giảm thiểu:** Phase 2 mặc định populate tất cả field/component mà frontend đang dùng; không cần parse `populate` query phức tạp

---

## Phạm vi ngoài spec này (để Phase sau)

- Nested `items` trong `company_achievement` (rich-text → quotes)
- Media trong component article (`shared.article.media`)
- Filter phức tạp hơn ngoài `filters[slug][$eq]`
- Locale filtering chặt chẽ
- Populate selective (chỉ populate field cụ thể)
- Dynamic zones/blocks trong `static-pages`

---

## Tóm tắt deliverables

### Files cần tạo mới
- `laravel_api/app/Models/Concerns/ResolvesComponents.php`
- `laravel_api/app/Models/Concerns/ResolvesSeo.php`

### Files cần sửa
- `laravel_api/routes/api.php` (thêm route `/api/global`, sửa logic `/api/home-page-contents`, thêm collection `/api/static-pages`)
- `laravel_api/app/Models/GlobalSetting.php` (thêm methods media + SEO)
- `laravel_api/app/Models/HomePageContent.php` (thêm methods component)
- `laravel_api/app/Models/StaticPage.php` (thêm method SEO)
- `laravel_api/app/Http/Resources/GlobalResource.php` (thêm fields)
- `laravel_api/app/Http/Resources/HomePageContentResource.php` (thêm fields)
- `laravel_api/app/Http/Resources/StaticPageResource.php` (thêm field SEO)
- `laravel_api/app/Http/Controllers/Api/GlobalController.php` (preload)
- `laravel_api/app/Http/Controllers/Api/HomePageContentController.php` (đổi logic single-type)
- `laravel_api/app/Http/Controllers/Api/StaticPageController.php` (thêm method index + filter)

### Tài liệu cần cập nhật
- `docs/laravel-phase1-summary.md` → đổi tên thành `docs/laravel-phase1-2-summary.md` và bổ sung Phase 2

---

## Kết luận

Spec này thiết kế compatibility layer cho 3 endpoint content còn lại (`global`, `home-page-content`, `static-pages`) theo chiến lược **"Cân bằng"**: giữ shape gần Strapi ở field cốt lõi, flatten component/SEO/media theo mức frontend đang dùng trước.

Ưu tiên bám sát contract thực tế trong `API_REFERENCE.md` và giữ nguyên naming field theo Strapi/frontend hiện tại để frontend React đổi sang Laravel với **ít sửa client nhất**.

Sau khi triển khai xong, frontend chỉ cần đổi base URL từ `https://assets.kachivina.vn` sang Laravel endpoint mà gần như không phải sửa code client.
