# Compatibility Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai compatibility layer cho `global`, `home-page-content`, và `static-pages` trong Laravel để match contract thực tế ở `API_REFERENCE.md` với thay đổi DB bằng 0.

**Architecture:** Giữ Eloquent models map trực tiếp vào DB Strapi hiện tại, bổ sung các trait resolver nhỏ để đọc component links (`*_cmps`), component tables (`components_shared_*`), và media (`files_related_mph`). Controllers chỉ parse request contract thật và preload dữ liệu; resources xuất JSON cuối cùng với naming giữ nguyên theo Strapi/frontend (`footer_content`, `button_link`, `company_achievement`, `SEO`).

**Tech Stack:** Laravel 11, Eloquent, MySQL schema của Strapi, PHP 8.x, curl, jq

---

## File Structure

### Files tạo mới
- `laravel_api/app/Models/Concerns/ResolvesComponents.php` — helper resolve component links từ bảng `*_cmps` sang bản ghi component tương ứng.
- `laravel_api/app/Models/Concerns/ResolvesSeo.php` — helper resolve SEO component + `shareImage` media.
- `docs/superpowers/plans/2026-04-22-compatibility-layer-implementation.md` — implementation plan này.

### Files sửa
- `laravel_api/routes/api.php` — thêm route compatibility `/api/global`, `/api/home-page-content`, `/api/static-pages` collection filter.
- `laravel_api/app/Models/GlobalSetting.php` — thêm methods resolve direct media + default SEO.
- `laravel_api/app/Models/HomePageContent.php` — thêm methods resolve component article/rich-text.
- `laravel_api/app/Models/StaticPage.php` — thêm method resolve SEO.
- `laravel_api/app/Http/Controllers/Api/GlobalController.php` — đọc đúng route `/api/global`, preload media + SEO.
- `laravel_api/app/Http/Controllers/Api/HomePageContentController.php` — đổi từ collection paginate sang single-type response.
- `laravel_api/app/Http/Controllers/Api/StaticPageController.php` — thêm `index()` hỗ trợ `filters[slug][$eq]`.
- `laravel_api/app/Http/Resources/GlobalResource.php` — output `footer_content`, media, `defaultSeo`.
- `laravel_api/app/Http/Resources/HomePageContentResource.php` — output component fields theo snake_case contract.
- `laravel_api/app/Http/Resources/StaticPageResource.php` — output `SEO`.
- `docs/laravel-phase1-summary.md` — cập nhật kết quả Phase 2 sau khi verify xong.

### Files tham chiếu khi test
- `API_REFERENCE.md` — baseline contract request/response thật.
- `docs/superpowers/specs/2026-04-22-compatibility-layer-design.md` — spec đã approve.

---

### Task 1: Thêm route compatibility đúng contract frontend

**Files:**
- Modify: `laravel_api/routes/api.php:20-27`
- Test: bằng `php artisan route:list`, `curl`

- [ ] **Step 1: Viết failing check cho route contract**

Mục tiêu check:
- Có route `GET /api/global`
- Có route `GET /api/home-page-content`
- Có route `GET /api/static-pages`
- Giữ route cũ `/api/globals`, `/api/home-page-contents`, `/api/static-pages/{slug}`

- [ ] **Step 2: Chạy route:list để xác nhận route mới chưa tồn tại**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" route:list --path=api
```
Expected: chỉ thấy `/api/globals`, `/api/home-page-contents`, `/api/static-pages/{slug}`; chưa có `/api/global`, `/api/home-page-content`, `/api/static-pages` collection.

- [ ] **Step 3: Sửa route file tối thiểu**

Code cần đạt trong `laravel_api/routes/api.php`:
```php
// Static Pages
Route::get('/static-pages', [\App\Http\Controllers\Api\StaticPageController::class, 'index']);
Route::get('/static-pages/{slug}', [\App\Http\Controllers\Api\StaticPageController::class, 'show']);

// Global settings
Route::get('/global', [\App\Http\Controllers\Api\GlobalController::class, 'show']);
Route::get('/globals', [\App\Http\Controllers\Api\GlobalController::class, 'show']);

// Home page content
Route::get('/home-page-content', [\App\Http\Controllers\Api\HomePageContentController::class, 'show']);
Route::get('/home-page-contents', [\App\Http\Controllers\Api\HomePageContentController::class, 'show']);
```

- [ ] **Step 4: Chạy route:list để verify route đã đúng**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" route:list --path=api
```
Expected: có đủ 6 route trên.

- [ ] **Step 5: Commit**

```bash
git add laravel_api/routes/api.php
git commit -m "feat: add compatibility routes for content endpoints"
```

---

### Task 2: Tạo trait resolve component links dùng chung

**Files:**
- Create: `laravel_api/app/Models/Concerns/ResolvesComponents.php`
- Modify: `laravel_api/app/Models/GlobalSetting.php`
- Modify: `laravel_api/app/Models/HomePageContent.php`
- Modify: `laravel_api/app/Models/StaticPage.php`
- Test: `php -l`, `artisan tinker`

- [ ] **Step 1: Viết failing probe trong tinker cho component link**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" tinker --execute="dump(method_exists(new \App\Models\GlobalSetting(), 'resolveComponentRecord'));"
```
Expected: `false`

- [ ] **Step 2: Tạo trait `ResolvesComponents.php`**

Code:
```php
<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\DB;

trait ResolvesComponents
{
    protected function componentLinkTable(): string
    {
        return $this->getTable().'_cmps';
    }

    protected function resolveComponentLink(string $field, ?string $componentType = null): ?object
    {
        $query = DB::table($this->componentLinkTable())
            ->where('entity_id', $this->id)
            ->where('field', $field)
            ->orderBy('order');

        if ($componentType !== null) {
            $query->where('component_type', $componentType);
        }

        return $query->first();
    }

    protected function resolveComponentRecord(string $field, string $componentType, string $componentTable): ?object
    {
        $link = $this->resolveComponentLink($field, $componentType);

        if (!$link) {
            return null;
        }

        return DB::table($componentTable)
            ->where('id', $link->component_id ?? $link->cmp_id)
            ->first();
    }
}
```

- [ ] **Step 3: Gắn trait vào 3 model**

Code thêm vào mỗi model:
```php
use App\Models\Concerns\ResolvesComponents;

class GlobalSetting extends Model
{
    use InteractsWithStrapiMedia;
    use ResolvesComponents;
```

Tương tự cho `HomePageContent` và `StaticPage`.

- [ ] **Step 4: Chạy lint PHP cho trait và model đã sửa**

Run:
```bash
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/Concerns/ResolvesComponents.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/GlobalSetting.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/HomePageContent.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/StaticPage.php"
```
Expected: `No syntax errors detected`

- [ ] **Step 5: Verify trait method xuất hiện**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" tinker --execute="dump(method_exists(new \App\Models\GlobalSetting(), 'resolveComponentRecord'));"
```
Expected: `true`

- [ ] **Step 6: Commit**

```bash
git add laravel_api/app/Models/Concerns/ResolvesComponents.php laravel_api/app/Models/GlobalSetting.php laravel_api/app/Models/HomePageContent.php laravel_api/app/Models/StaticPage.php
git commit -m "feat: add shared component resolver trait"
```

---

### Task 3: Tạo trait resolve SEO component dùng chung

**Files:**
- Create: `laravel_api/app/Models/Concerns/ResolvesSeo.php`
- Modify: `laravel_api/app/Models/GlobalSetting.php`
- Modify: `laravel_api/app/Models/StaticPage.php`
- Test: `php -l`, `artisan tinker`

- [ ] **Step 1: Viết failing probe cho SEO resolver**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" tinker --execute="dump(method_exists(new \App\Models\GlobalSetting(), 'resolveSeo'));"
```
Expected: `false`

- [ ] **Step 2: Tạo trait `ResolvesSeo.php`**

Code:
```php
<?php

namespace App\Models\Concerns;

use App\Models\File;
use Illuminate\Support\Facades\DB;

trait ResolvesSeo
{
    protected function resolveSeo(string $field = 'SEO'): ?array
    {
        $record = $this->resolveComponentRecord($field, 'shared.seo', 'components_shared_seos');

        if (!$record) {
            return null;
        }

        $shareImage = File::query()
            ->join('files_related_mph', 'files.id', '=', 'files_related_mph.file_id')
            ->where('files_related_mph.related_type', 'shared.seo')
            ->where('files_related_mph.related_id', $record->id)
            ->where('files_related_mph.field', 'shareImage')
            ->orderBy('files_related_mph.order')
            ->select('files.*')
            ->first();

        return [
            'id' => $record->id,
            'metaTitle' => $record->metaTitle ?? $record->meta_title ?? null,
            'metaDescription' => $record->metaDescription ?? $record->meta_description ?? null,
            'shareImage' => $shareImage,
        ];
    }
}
```

- [ ] **Step 3: Gắn trait vào `GlobalSetting` và `StaticPage`**

Code thêm:
```php
use App\Models\Concerns\ResolvesSeo;

class StaticPage extends Model
{
    use InteractsWithStrapiMedia;
    use ResolvesComponents;
    use ResolvesSeo;
```

Tương tự cho `GlobalSetting`.

- [ ] **Step 4: Thêm method public wrapper trong model**

Code cho `GlobalSetting.php`:
```php
public function defaultSeo(): ?array
{
    return $this->resolveSeo('defaultSeo');
}
```

Code cho `StaticPage.php`:
```php
public function seo(): ?array
{
    return $this->resolveSeo('SEO');
}
```

- [ ] **Step 5: Chạy lint và probe method**

Run:
```bash
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/Concerns/ResolvesSeo.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/GlobalSetting.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/StaticPage.php"
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" tinker --execute="dump(method_exists(new \App\Models\GlobalSetting(), 'defaultSeo')); dump(method_exists(new \App\Models\StaticPage(), 'seo'));"
```
Expected: syntax OK, `true`, `true`

- [ ] **Step 6: Commit**

```bash
git add laravel_api/app/Models/Concerns/ResolvesSeo.php laravel_api/app/Models/GlobalSetting.php laravel_api/app/Models/StaticPage.php
git commit -m "feat: add shared seo resolver trait"
```

---

### Task 4: Hoàn thiện model + resource + controller cho `/api/global`

**Files:**
- Modify: `laravel_api/app/Models/GlobalSetting.php`
- Modify: `laravel_api/app/Http/Resources/GlobalResource.php`
- Modify: `laravel_api/app/Http/Controllers/Api/GlobalController.php`
- Test: `curl`, `jq`, `php -l`, `artisan tinker`

- [ ] **Step 1: Viết failing check cho contract `/api/global`**

Run:
```bash
curl -s http://127.0.0.1:8001/api/global | jq '.data | {siteName, footer_content, favicon, defaultSeo, logo, logo2}'
```
Expected trước khi sửa: thiếu `footer_content`, `favicon`, `defaultSeo`, `logo`, `logo2` hoặc route chưa tồn tại.

- [ ] **Step 2: Bổ sung methods media + SEO vào `GlobalSetting.php`**

Code:
```php
public function favicon(): ?File
{
    return $this->firstMediaByField('favicon');
}

public function logo(): ?File
{
    return $this->firstMediaByField('logo');
}

public function logo2(): ?File
{
    return $this->firstMediaByField('logo2');
}
```

- [ ] **Step 3: Sửa `GlobalResource.php` giữ naming đúng contract**

Code `toArray()` cần đạt:
```php
return [
    'id' => $this->id,
    'documentId' => $this->document_id,
    'siteName' => $this->site_name,
    'createdAt' => $this->created_at?->toIso8601String(),
    'updatedAt' => $this->updated_at?->toIso8601String(),
    'publishedAt' => $this->published_at?->toIso8601String(),
    'map' => $this->map,
    'footer_content' => $this->footer_content,
    'favicon' => ($favicon = $this->favicon()) ? new FileResource($favicon) : null,
    'defaultSeo' => $this->defaultSeo(),
    'logo' => ($logo = $this->logo()) ? new FileResource($logo) : null,
    'logo2' => ($logo2 = $this->logo2()) ? new FileResource($logo2) : null,
];
```

- [ ] **Step 4: Sửa `GlobalController.php` preload media trước khi trả resource**

Code chính:
```php
$item = GlobalSetting::current();

if (!$item) {
    return response()->json([
        'data' => null,
        'meta' => new \stdClass(),
    ]);
}

GlobalSetting::preloadMediaForCollection(collect([$item]), ['favicon', 'logo', 'logo2']);
```

- [ ] **Step 5: Lint file đã sửa**

Run:
```bash
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/GlobalSetting.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Resources/GlobalResource.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Controllers/Api/GlobalController.php"
```

- [ ] **Step 6: Verify contract so với `API_REFERENCE.md`**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/global?populate=*" | jq '.data | {siteName, map, footer_content, favicon: (.favicon | {id, documentId, name, url}), defaultSeo: (.defaultSeo | {id, metaTitle, metaDescription}), logo: (.logo | {id, documentId, name, url}), logo2: (.logo2 | {id, documentId, name, url})}'
```
Expected: đủ key và naming đúng.

- [ ] **Step 7: Commit**

```bash
git add laravel_api/app/Models/GlobalSetting.php laravel_api/app/Http/Resources/GlobalResource.php laravel_api/app/Http/Controllers/Api/GlobalController.php
git commit -m "feat: add global compatibility endpoint"
```

---

### Task 5: Hoàn thiện model + resource + controller cho `/api/home-page-content`

**Files:**
- Modify: `laravel_api/app/Models/HomePageContent.php`
- Modify: `laravel_api/app/Http/Resources/HomePageContentResource.php`
- Modify: `laravel_api/app/Http/Controllers/Api/HomePageContentController.php`
- Test: `curl`, `jq`, `php -l`, `artisan tinker`

- [ ] **Step 1: Viết failing check cho shape single-type**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/home-page-content?locale=vi&populate=*" | jq '. | {dataType: (.data | type), hasPartner: (.data.partner != null), hasCompanyAchievement: (.data.company_achievement != null)}'
```
Expected trước khi sửa: route chưa có hoặc `dataType` là `array`.

- [ ] **Step 2: Thêm methods resolve component vào `HomePageContent.php`**

Code:
```php
public function partner(): ?array
{
    return $this->resolveArticleComponent('partner');
}

public function service(): ?array
{
    return $this->resolveArticleComponent('service');
}

public function aboutus(): ?array
{
    return $this->resolveArticleComponent('aboutus');
}

public function news(): ?array
{
    return $this->resolveArticleComponent('news');
}

public function companyAchievement(): ?array
{
    $record = $this->resolveComponentRecord('company_achievement', 'shared.rich-text', 'components_shared_rich_texts');

    if (!$record) {
        return null;
    }

    return [
        'id' => $record->id,
        'title' => $record->title,
        'description' => $record->description,
    ];
}

protected function resolveArticleComponent(string $field): ?array
{
    $record = $this->resolveComponentRecord($field, 'shared.article', 'components_shared_articles');

    if (!$record) {
        return null;
    }

    return [
        'id' => $record->id,
        'title' => $record->title,
        'description' => $record->description,
        'button_link' => $record->button_link,
        'button_name' => $record->button_name,
    ];
}
```

- [ ] **Step 3: Sửa `HomePageContentResource.php`**

Code `toArray()` cần đạt:
```php
return [
    'id' => $this->id,
    'documentId' => $this->document_id,
    'createdAt' => $this->created_at?->toIso8601String(),
    'updatedAt' => $this->updated_at?->toIso8601String(),
    'publishedAt' => $this->published_at?->toIso8601String(),
    'partner' => $this->partner(),
    'service' => $this->service(),
    'aboutus' => $this->aboutus(),
    'news' => $this->news(),
    'company_achievement' => $this->companyAchievement(),
];
```

- [ ] **Step 4: Đổi controller sang single-type response**

Code `show()` cần đạt:
```php
public function show(Request $request): JsonResponse
{
    $item = HomePageContent::query()
        ->published()
        ->when($request->filled('locale'), fn ($query) => $query->where('locale', $request->input('locale')))
        ->orderByDesc('id')
        ->first();

    return response()->json([
        'data' => $item ? new HomePageContentResource($item) : null,
        'meta' => new \stdClass(),
    ]);
}
```

- [ ] **Step 5: Lint file đã sửa**

Run:
```bash
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/HomePageContent.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Resources/HomePageContentResource.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Controllers/Api/HomePageContentController.php"
```

- [ ] **Step 6: Verify contract so với `API_REFERENCE.md`**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/home-page-content?locale=vi&populate=*" | jq '.data | {id, partner, service, aboutus, news, company_achievement}'
```
Expected: `data` là object; nested keys giữ `button_link`, `button_name`, `company_achievement`.

- [ ] **Step 7: Commit**

```bash
git add laravel_api/app/Models/HomePageContent.php laravel_api/app/Http/Resources/HomePageContentResource.php laravel_api/app/Http/Controllers/Api/HomePageContentController.php
git commit -m "feat: add home page content compatibility endpoint"
```

---

### Task 6: Hoàn thiện model + resource + controller cho `/api/static-pages?filters[slug][$eq]=...`

**Files:**
- Modify: `laravel_api/app/Models/StaticPage.php`
- Modify: `laravel_api/app/Http/Resources/StaticPageResource.php`
- Modify: `laravel_api/app/Http/Controllers/Api/StaticPageController.php`
- Test: `curl`, `jq`, `php -l`

- [ ] **Step 1: Viết failing check cho collection filter endpoint**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/static-pages?filters[slug][\$eq]=gioi-thieu&populate=*" | jq '. | {dataType: (.data | type), hasMeta: (.meta != null)}'
```
Expected trước khi sửa: route chưa tồn tại hoặc không trả collection shape.

- [ ] **Step 2: Thêm method `seo()` vào `StaticPage.php`**

Code:
```php
public function seo(): ?array
{
    return $this->resolveSeo('SEO');
}
```

- [ ] **Step 3: Sửa `StaticPageResource.php` giữ key `SEO`**

Code `toArray()` cần đạt:
```php
return [
    'id' => $this->id,
    'documentId' => $this->document_id,
    'title' => $this->title,
    'slug' => $this->slug,
    'content' => $this->content,
    'createdAt' => $this->created_at?->toIso8601String(),
    'updatedAt' => $this->updated_at?->toIso8601String(),
    'publishedAt' => $this->published_at?->toIso8601String(),
    'locale' => $this->locale,
    'SEO' => $this->seo(),
];
```

- [ ] **Step 4: Thêm `index()` vào `StaticPageController.php`**

Code:
```php
public function index(Request $request): JsonResponse
{
    $query = StaticPage::query()->published();

    $slug = $request->input('filters.slug.$eq');
    if ($slug) {
        $query->where('slug', $slug);
    }

    $perPage = max(1, (int) $request->input('pagination.pageSize', 25));
    $items = $query->orderByDesc('id')->paginate($perPage);

    return response()->json([
        'data' => StaticPageResource::collection($items->getCollection()),
        'meta' => [
            'pagination' => [
                'page' => $items->currentPage(),
                'pageSize' => $items->perPage(),
                'pageCount' => $items->lastPage(),
                'total' => $items->total(),
            ],
        ],
    ]);
}
```

- [ ] **Step 5: Giữ `show()` cũ để backward compatible**

Check rằng `show(string $slug)` vẫn giữ response:
```php
return response()->json([
    'data' => new StaticPageResource($item),
    'meta' => new \stdClass(),
]);
```

- [ ] **Step 6: Lint file đã sửa**

Run:
```bash
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Models/StaticPage.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Resources/StaticPageResource.php"
php -l "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/app/Http/Controllers/Api/StaticPageController.php"
```

- [ ] **Step 7: Verify cả case có dữ liệu và rỗng**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/static-pages?filters[slug][\$eq]=gioi-thieu&populate=*" | jq '.meta.pagination'
curl -s "http://127.0.0.1:8001/api/static-pages?filters[slug][\$eq]=lien-he&populate=*" | jq '{count: (.data | length), total: .meta.pagination.total}'
```
Expected:
- case có dữ liệu: `data` là array, mỗi item có `SEO`
- case rỗng: `count = 0`, `total = 0`

- [ ] **Step 8: Commit**

```bash
git add laravel_api/app/Models/StaticPage.php laravel_api/app/Http/Resources/StaticPageResource.php laravel_api/app/Http/Controllers/Api/StaticPageController.php
git commit -m "feat: add static pages compatibility endpoint"
```

---

### Task 7: Verify end-to-end và cập nhật tài liệu

**Files:**
- Modify: `docs/laravel-phase1-summary.md`
- Test: `curl`, `jq`, `php artisan route:list`

- [ ] **Step 1: Chạy full verification script**

Run:
```bash
curl -s "http://127.0.0.1:8001/api/global?populate=*" | jq '.data | keys'
curl -s "http://127.0.0.1:8001/api/home-page-content?locale=vi&populate=*" | jq '.data | keys'
curl -s "http://127.0.0.1:8001/api/static-pages?filters[slug][\$eq]=gioi-thieu&populate=*" | jq '.meta.pagination'
```
Expected:
- `/api/global` có keys: `siteName`, `map`, `footer_content`, `favicon`, `defaultSeo`, `logo`, `logo2`
- `/api/home-page-content` có keys: `partner`, `service`, `aboutus`, `news`, `company_achievement`
- `/api/static-pages` có pagination object đầy đủ

- [ ] **Step 2: So sánh naming với `API_REFERENCE.md`**

Checklist:
```text
[ ] /api/global giữ footer_content
[ ] /api/home-page-content giữ button_link
[ ] /api/home-page-content giữ button_name
[ ] /api/home-page-content giữ company_achievement
[ ] /api/static-pages giữ SEO
```

- [ ] **Step 3: Cập nhật tài liệu summary**

Thêm vào `docs/laravel-phase1-summary.md` các dòng sau ở phần verified:
```markdown
- ✅ Compatibility endpoint `/api/global?populate=*` trả đúng shape frontend đang dùng
- ✅ Compatibility endpoint `/api/home-page-content?locale=vi&populate=*` trả single-type object
- ✅ Compatibility endpoint `/api/static-pages?filters[slug][$eq]=...&populate=*` hỗ trợ filter slug + pagination
- ✅ Giữ naming theo Strapi/frontend: `footer_content`, `button_link`, `button_name`, `company_achievement`, `SEO`
```

- [ ] **Step 4: Lint nhanh và route list lần cuối**

Run:
```bash
php "/Users/tranngocthang/webroot/thang/trang_backend/laravel_api/artisan" route:list --path=api
```
Expected: có `/api/global`, `/api/home-page-content`, `/api/static-pages`.

- [ ] **Step 5: Commit**

```bash
git add docs/laravel-phase1-summary.md
git commit -m "docs: record compatibility layer verification"
```

---

## Self-Review

### Spec coverage
- `global` compatibility endpoint: covered by Task 4.
- `home-page-content` single-type endpoint: covered by Task 5.
- `static-pages` collection filter endpoint: covered by Task 6.
- Shared resolver traits: covered by Tasks 2-3.
- Snake_case naming and contract verification against `API_REFERENCE.md`: covered by Task 7.

### Placeholder scan
- Không có `TODO`, `TBD`, hay “write tests” chung chung.
- Mỗi task đều có file path, code mẫu, command, expected output.

### Type consistency
- Dùng nhất quán `defaultSeo()` cho Global, `seo()` cho StaticPage, `companyAchievement()` trong model nhưng output key `company_achievement` ở resource.
- Route compatibility dùng `show()` cho single-type controllers và `index()` cho static-pages collection.
