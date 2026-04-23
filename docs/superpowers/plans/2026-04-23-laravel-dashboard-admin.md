# Laravel Dashboard Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng dashboard/admin trên Laravel để quản trị các content type chính đang phục vụ frontend, ưu tiên CRUD chạy được sớm với thay đổi tối thiểu trên codebase và schema hiện có.

**Architecture:** Dùng Filament 3 làm admin panel vì tương thích tự nhiên với Laravel 11, tích hợp trực tiếp Eloquent models hiện có, có sẵn auth/resource/form/table/action nên chi phí triển khai thấp nhất. TailAdmin chỉ dùng như một hướng tùy chọn ở phase sau vì bản Laravel của TailAdmin là starter project riêng, không phải package drop-in cho app hiện tại; nếu muốn dùng thì nên giới hạn ở custom theme/shell sau khi CRUD core đã ổn định.

**UI/Flow Reference:** Tham chiếu project Craftable-style có sẵn tại `~/webroot/thang/cab` (Laravel 9 admin app) để học cách bố trí navigation, settings structure, roles/permissions pattern, và menu builder flow. **Không** copy dependency stack từ `cab` sang vì version gap (Laravel 9 vs 11) và package cũ (`laravel/ui`, `yajra/datatables`, `infyomlabs`, `laravelcollective/html`). Chỉ học UI/UX decisions: dashboard widgets placement, resource grouping trong sidebar, form layout conventions, và cách xử lý settings singleton.

**Tech Stack:** Laravel 11, PHP 8.2, Filament 3, Livewire 3, Eloquent, PHPUnit 11, Vite/Tailwind (nếu cần custom UI sau này).

---

## Scope chốt cho plan này

### In scope
- Cài và cấu hình Filament panel cho `laravel_api`
- Tạo đăng nhập admin dựa trên bảng `users` hiện có
- Tạo CRUD tối thiểu cho các content type chính:
  - `globals`
  - `static_pages`
  - `products`
  - `services`
  - `articles`
  - `slides`
  - `khach_hangs`
  - `about_uses`
  - `menus`
  - `bao_gia_and_tu_vans` (list/read + xử lý trạng thái cơ bản nếu cần)
- Hỗ trợ upload/chọn media theo schema Strapi đang có
- Giữ naming/schema DB hiện tại, không phá compatibility layer API đã hoàn tất
- Tạo dashboard landing page tối thiểu với số liệu nhanh

### Out of scope
- Rebuild toàn bộ admin giống hệt Strapi
- Deep component builder cho `home-page-content`
- Rich workflow phê duyệt/nhiều vai trò phức tạp
- Import TailAdmin starter nguyên project vào app hiện tại
- Refactor lớn model/schema

## Ràng buộc kỹ thuật đã xác minh
- `laravel_api/composer.json` hiện chỉ có Laravel core, chưa có admin panel package.
- `laravel_api/routes/web.php` gần như trống, nên có thể gắn panel mới mà không phải migrate UI cũ.
- Bảng `users` và `migrations` đã tồn tại, phù hợp để dựng auth admin.
- Các model content chính đã có sẵn và đang được API sử dụng: `GlobalSetting`, `StaticPage`, `Product`, `Service`, `Article`, `Slide`, `KhachHang`, `AboutUs`, `Menu`, `BaoGiaAndTuVan`.
- `HomePageContent` vẫn đang bị blocker vì thiếu mapping component thực tế; không đưa vào batch CRUD đầu tiên.
- TailAdmin có Laravel starter riêng theo docs, nên chỉ phù hợp làm nguồn tham khảo UI hoặc phase tách shell giao diện sau.
- Project `~/webroot/thang/cab` đang chạy Laravel 9 với Craftable-style admin, có routes cho `roles`, `users`, `permission`, `modules`, `settings` (email/datetime/logo), `language`, `menus`, `posts`, `projects`, `categories`, `products`, `bookings`, `pages`. Các pattern này có thể học để bố trí navigation và settings structure trong Filament, nhưng không nên migrate dependency stack cũ sang Laravel 11.

## Cấu trúc file dự kiến

### Cài đặt và bootstrapping admin
- Modify: `laravel_api/composer.json` — thêm Filament và dependencies cần thiết
- Modify: `laravel_api/routes/web.php` — đảm bảo web routes không xung đột panel
- Create/Modify: `laravel_api/app/Providers/Filament/AdminPanelProvider.php` — khai báo panel, auth, navigation, middleware
- Create/Modify: `laravel_api/config/filament.php` hoặc config tương ứng do installer sinh ra

### Auth/admin user
- Modify: `laravel_api/app/Models/User.php` — thêm contract/trait cần cho Filament
- Create: `laravel_api/database/seeders/AdminUserSeeder.php` — seed tài khoản admin đầu tiên
- Modify: `laravel_api/database/seeders/DatabaseSeeder.php` — gọi seeder admin

### Dashboard widgets/pages
- Create: `laravel_api/app/Filament/Widgets/ContentOverviewWidget.php`
- Create: `laravel_api/app/Filament/Pages/Dashboard.php` (nếu cần custom)

### Resources theo content type
- Create: `laravel_api/app/Filament/Resources/GlobalSettingResource.php`
- Create: `laravel_api/app/Filament/Resources/StaticPageResource.php`
- Create: `laravel_api/app/Filament/Resources/ProductResource.php`
- Create: `laravel_api/app/Filament/Resources/ServiceResource.php`
- Create: `laravel_api/app/Filament/Resources/ArticleResource.php`
- Create: `laravel_api/app/Filament/Resources/SlideResource.php`
- Create: `laravel_api/app/Filament/Resources/KhachHangResource.php`
- Create: `laravel_api/app/Filament/Resources/AboutUsResource.php`
- Create: `laravel_api/app/Filament/Resources/MenuResource.php`
- Create: `laravel_api/app/Filament/Resources/BaoGiaAndTuVanResource.php`

### Resource pages (Filament generate)
- Create dưới từng resource: `Pages/List*`, `Pages/Create*`, `Pages/Edit*`
- Với `GlobalSetting` có thể dùng edit-only flow thay vì create nhiều bản ghi nếu chốt single-record behavior

### Form/table support tùy chỉnh
- Create: `laravel_api/app/Filament/Forms/Components/StrapiMediaPicker.php` hoặc helper tương đương nếu upload/media cần custom hóa sâu
- Hoặc tối thiểu dùng trực tiếp Filament form fields trong từng Resource, chưa tách abstraction nếu chưa cần

### Tests
- Create: `laravel_api/tests/Feature/Filament/AdminAuthTest.php`
- Create: `laravel_api/tests/Feature/Filament/DashboardAccessTest.php`
- Create: `laravel_api/tests/Feature/Filament/GlobalSettingResourceTest.php`
- Create: `laravel_api/tests/Feature/Filament/StaticPageResourceTest.php`
- Create: `laravel_api/tests/Feature/Filament/ProductResourceTest.php`
- Create: `laravel_api/tests/Feature/Filament/ServiceResourceTest.php`
- Create: `laravel_api/tests/Feature/Filament/ArticleResourceTest.php`
- Create: `laravel_api/tests/Feature/Filament/SupportReadOnlyResourcesTest.php`

---

### Task 1: Cài Filament và dựng panel admin tối thiểu

**Files:**
- Modify: `laravel_api/composer.json`
- Modify: `laravel_api/app/Models/User.php`
- Create: `laravel_api/app/Providers/Filament/AdminPanelProvider.php`
- Test: `laravel_api/tests/Feature/Filament/AdminAuthTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_login_page_is_accessible(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertStatus(200);
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/AdminAuthTest.php`
Expected: FAIL vì `/admin/login` và `/admin` chưa tồn tại.

- [ ] **Step 3: Write minimal implementation**

Cập nhật `app/Models/User.php` để phù hợp Filament:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return true;
    }
}
```

Tạo `app/Providers/Filament/AdminPanelProvider.php`:

```php
<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->pages([
                Dashboard::class,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
```

Cài package:

```bash
composer require filament/filament:"^3.2" livewire/livewire:"^3.0"
php artisan filament:install --panels
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/AdminAuthTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add composer.json composer.lock app/Models/User.php app/Providers/Filament tests/Feature/Filament/AdminAuthTest.php
git commit -m "feat: bootstrap Filament admin panel"
```

### Task 2: Seed admin user và chốt luồng đăng nhập

**Files:**
- Create: `laravel_api/database/seeders/AdminUserSeeder.php`
- Modify: `laravel_api/database/seeders/DatabaseSeeder.php`
- Test: `laravel_api/tests/Feature/Filament/DashboardAccessTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_admin_login(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_admin_user_can_access_dashboard_after_login(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->actingAs($user)->get('/admin');

        $response->assertOk();
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/DashboardAccessTest.php`
Expected: FAIL nếu auth flow hoặc session chưa ổn định.

- [ ] **Step 3: Write minimal implementation**

Tạo `database/seeders/AdminUserSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
            ]
        );
    }
}
```

Cập nhật `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}
```

Chạy seed:

```bash
php artisan db:seed --class=AdminUserSeeder
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/DashboardAccessTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add database/seeders tests/Feature/Filament/DashboardAccessTest.php
git commit -m "feat: add admin seeder and auth coverage"
```

### Task 3: Tạo dashboard overview page/widget

**Files:**
- Create: `laravel_api/app/Filament/Widgets/ContentOverviewWidget.php`
- Create: `laravel_api/app/Filament/Pages/Dashboard.php` (nếu custom)
- Test: `laravel_api/tests/Feature/Filament/DashboardAccessTest.php`

- [ ] **Step 1: Write the failing test**

Mở rộng `DashboardAccessTest` với assertion nội dung widget:

```php
public function test_dashboard_shows_content_overview_stats(): void
{
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/admin');

    $response->assertSee('Static Pages');
    $response->assertSee('Products');
    $response->assertSee('Services');
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/DashboardAccessTest.php --filter=content_overview`
Expected: FAIL vì widget chưa tồn tại.

- [ ] **Step 3: Write minimal implementation**

Tạo `app/Filament/Widgets/ContentOverviewWidget.php`:

```php
<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\BaoGiaAndTuVan;
use App\Models\Product;
use App\Models\Service;
use App\Models\StaticPage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ContentOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Static Pages', (string) StaticPage::query()->count()),
            Stat::make('Products', (string) Product::query()->count()),
            Stat::make('Services', (string) Service::query()->count()),
            Stat::make('Articles', (string) Article::query()->count()),
            Stat::make('Leads', (string) BaoGiaAndTuVan::query()->count()),
        ];
    }
}
```

Nếu cần custom dashboard page, tạo page và đăng ký widget theo generator của Filament.

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/DashboardAccessTest.php --filter=content_overview`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Widgets tests/Feature/Filament/DashboardAccessTest.php
git commit -m "feat: add admin dashboard overview widget"
```

### Task 4: Tạo resource cho GlobalSetting theo edit-first workflow

**Files:**
- Create: `laravel_api/app/Filament/Resources/GlobalSettingResource.php`
- Create: `laravel_api/app/Filament/Resources/GlobalSettingResource/Pages/EditGlobalSetting.php`
- Test: `laravel_api/tests/Feature/Filament/GlobalSettingResourceTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\GlobalSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GlobalSettingResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_global_setting_edit_page(): void
    {
        $user = User::factory()->create();
        $global = GlobalSetting::query()->create([
            'document_id' => 'global-1',
            'site_name' => 'Kachivina',
        ]);

        $response = $this->actingAs($user)->get("/admin/global-settings/{$global->getKey()}/edit");

        $response->assertOk();
        $response->assertSee('Kachivina');
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/GlobalSettingResourceTest.php`
Expected: FAIL vì resource chưa có.

- [ ] **Step 3: Write minimal implementation**

Tạo resource với form fields khớp schema hiện có:

```php
public static function form(Form $form): Form
{
    return $form->schema([
        Forms\Components\TextInput::make('site_name')->required()->maxLength(255),
        Forms\Components\Textarea::make('map')->columnSpanFull(),
        Forms\Components\RichEditor::make('footer_content')->columnSpanFull(),
        Forms\Components\DateTimePicker::make('published_at'),
        Forms\Components\TextInput::make('locale')->maxLength(20),
    ]);
}
```

Table tối thiểu:

```php
public static function table(Table $table): Table
{
    return $table->columns([
        Tables\Columns\TextColumn::make('site_name')->searchable(),
        Tables\Columns\TextColumn::make('locale'),
        Tables\Columns\TextColumn::make('published_at')->dateTime(),
        Tables\Columns\TextColumn::make('updated_at')->dateTime(),
    ]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/GlobalSettingResourceTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/GlobalSettingResource* tests/Feature/Filament/GlobalSettingResourceTest.php
git commit -m "feat: add global setting admin resource"
```

### Task 5: Tạo resource cho StaticPage

**Files:**
- Create: `laravel_api/app/Filament/Resources/StaticPageResource.php`
- Test: `laravel_api/tests/Feature/Filament/StaticPageResourceTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\StaticPage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StaticPageResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_static_page_list(): void
    {
        $user = User::factory()->create();

        StaticPage::query()->create([
            'document_id' => 'page-1',
            'title' => 'Giới thiệu',
            'slug' => 'gioi-thieu',
        ]);

        $response = $this->actingAs($user)->get('/admin/static-pages');

        $response->assertOk();
        $response->assertSee('Giới thiệu');
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/StaticPageResourceTest.php`
Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

Resource form tối thiểu:

```php
public static function form(Form $form): Form
{
    return $form->schema([
        Forms\Components\TextInput::make('title')->required()->maxLength(255),
        Forms\Components\TextInput::make('slug')->required()->maxLength(255),
        Forms\Components\RichEditor::make('content')->columnSpanFull(),
        Forms\Components\DateTimePicker::make('published_at'),
        Forms\Components\TextInput::make('locale')->maxLength(20),
    ]);
}
```

Table tối thiểu:

```php
public static function table(Table $table): Table
{
    return $table->columns([
        Tables\Columns\TextColumn::make('title')->searchable(),
        Tables\Columns\TextColumn::make('slug')->searchable(),
        Tables\Columns\TextColumn::make('locale'),
        Tables\Columns\IconColumn::make('published_at')->boolean(fn ($state) => filled($state)),
        Tables\Columns\TextColumn::make('updated_at')->dateTime(),
    ]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/StaticPageResourceTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/StaticPageResource* tests/Feature/Filament/StaticPageResourceTest.php
git commit -m "feat: add static page admin resource"
```

### Task 6: Tạo resource cho Product và Service

**Files:**
- Create: `laravel_api/app/Filament/Resources/ProductResource.php`
- Create: `laravel_api/app/Filament/Resources/ServiceResource.php`
- Test: `laravel_api/tests/Feature/Filament/ProductResourceTest.php`
- Test: `laravel_api/tests/Feature/Filament/ServiceResourceTest.php`

- [ ] **Step 1: Write the failing tests**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_product_list(): void
    {
        $user = User::factory()->create();
        Product::query()->create([
            'document_id' => 'product-1',
            'title' => 'Xe đẩy inox',
            'slug' => 'xe-day-inox',
            'show_in_home' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/products');

        $response->assertOk();
        $response->assertSee('Xe đẩy inox');
    }
}
```

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_service_list(): void
    {
        $user = User::factory()->create();
        Service::query()->create([
            'document_id' => 'service-1',
            'title' => 'Gia công cơ khí',
            'slug' => 'gia-cong-co-khi',
            'show_in_home' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/services');

        $response->assertOk();
        $response->assertSee('Gia công cơ khí');
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `php artisan test tests/Feature/Filament/ProductResourceTest.php tests/Feature/Filament/ServiceResourceTest.php`
Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

Product form:

```php
Forms\Components\TextInput::make('title')->required()->maxLength(255),
Forms\Components\TextInput::make('slug')->required()->maxLength(255),
Forms\Components\Textarea::make('description')->columnSpanFull(),
Forms\Components\Toggle::make('show_in_home'),
Forms\Components\DateTimePicker::make('published_at'),
Forms\Components\TextInput::make('locale')->maxLength(20),
```

Service form:

```php
Forms\Components\TextInput::make('title')->required()->maxLength(255),
Forms\Components\TextInput::make('slug')->required()->maxLength(255),
Forms\Components\RichEditor::make('content')->columnSpanFull(),
Forms\Components\Toggle::make('show_in_home'),
Forms\Components\DateTimePicker::make('published_at'),
Forms\Components\TextInput::make('locale')->maxLength(20),
```

Table cho cả hai cần hiển thị `title`, `slug`, `show_in_home`, `published_at`, `updated_at`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `php artisan test tests/Feature/Filament/ProductResourceTest.php tests/Feature/Filament/ServiceResourceTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/ProductResource* app/Filament/Resources/ServiceResource* tests/Feature/Filament/ProductResourceTest.php tests/Feature/Filament/ServiceResourceTest.php
git commit -m "feat: add product and service admin resources"
```

### Task 7: Tạo resource cho Article, Slide, KhachHang, AboutUs

**Files:**
- Create: `laravel_api/app/Filament/Resources/ArticleResource.php`
- Create: `laravel_api/app/Filament/Resources/SlideResource.php`
- Create: `laravel_api/app/Filament/Resources/KhachHangResource.php`
- Create: `laravel_api/app/Filament/Resources/AboutUsResource.php`
- Test: `laravel_api/tests/Feature/Filament/SupportReadOnlyResourcesTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php

namespace Tests\Feature\Filament;

use App\Models\AboutUs;
use App\Models\Article;
use App\Models\KhachHang;
use App\Models\Slide;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupportReadOnlyResourcesTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_support_resource_indexes(): void
    {
        $user = User::factory()->create();

        Article::query()->create(['document_id' => 'article-1', 'title' => 'Tin tức 1']);
        Slide::query()->create(['document_id' => 'slide-1', 'content' => 'Slide 1']);
        KhachHang::query()->create(['document_id' => 'kh-1', 'title' => 'Khách hàng A']);
        AboutUs::query()->create(['document_id' => 'about-1', 'title' => 'Về chúng tôi']);

        $this->actingAs($user)->get('/admin/articles')->assertOk();
        $this->actingAs($user)->get('/admin/slides')->assertOk();
        $this->actingAs($user)->get('/admin/khach-hangs')->assertOk();
        $this->actingAs($user)->get('/admin/about-uses')->assertOk();
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/SupportReadOnlyResourcesTest.php`
Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

Tạo 4 resources với form/table bám fillable fields hiện có:
- `Article`: `title`, `slug`, `description`, `published_at`, `locale`
- `Slide`: `content`, `position`, `published_at`, `locale`
- `KhachHang`: `title`, `website`, `published_at`, `locale`
- `AboutUs`: `title`, `slug`, `content`, `order`, `published_at`, `locale`

Với `Slide.position` nếu DB là string/nullable thì để `TextInput`, chưa ép kiểu sâu trong phase đầu.

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/SupportReadOnlyResourcesTest.php`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/ArticleResource* app/Filament/Resources/SlideResource* app/Filament/Resources/KhachHangResource* app/Filament/Resources/AboutUsResource* tests/Feature/Filament/SupportReadOnlyResourcesTest.php
git commit -m "feat: add secondary content admin resources"
```

### Task 8: Tạo resource cho Menu và BaoGiaAndTuVan

**Files:**
- Create: `laravel_api/app/Filament/Resources/MenuResource.php`
- Create: `laravel_api/app/Filament/Resources/BaoGiaAndTuVanResource.php`
- Test: `laravel_api/tests/Feature/Filament/SupportReadOnlyResourcesTest.php`

- [ ] **Step 1: Write the failing test**

Mở rộng `SupportReadOnlyResourcesTest`:

```php
public function test_admin_can_view_menu_and_lead_indexes(): void
{
    $user = User::factory()->create();

    \App\Models\Menu::query()->create([
        'document_id' => 'menu-1',
        'title' => 'Main Menu',
        'slug' => 'main-menu',
        'items' => [],
    ]);

    \App\Models\BaoGiaAndTuVan::query()->create([
        'document_id' => 'lead-1',
        'customer_name' => 'Nguyen Van A',
        'customer_phone' => '0900000000',
    ]);

    $this->actingAs($user)->get('/admin/menus')->assertOk();
    $this->actingAs($user)->get('/admin/bao-gia-and-tu-vans')->assertOk();
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/SupportReadOnlyResourcesTest.php --filter=menu_and_lead`
Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

`MenuResource` form:

```php
Forms\Components\TextInput::make('title')->required()->maxLength(255),
Forms\Components\TextInput::make('slug')->required()->maxLength(255),
Forms\Components\KeyValue::make('items')->columnSpanFull(),
Forms\Components\DateTimePicker::make('published_at'),
Forms\Components\TextInput::make('locale')->maxLength(20),
```

`BaoGiaAndTuVanResource` form/table theo hướng read-first:

```php
Forms\Components\TextInput::make('customer_name')->disabled(),
Forms\Components\TextInput::make('customer_phone')->disabled(),
Forms\Components\Textarea::make('content')->disabled()->columnSpanFull(),
Forms\Components\DateTimePicker::make('published_at'),
```

Tắt create nếu muốn tránh nhập lead thủ công:

```php
public static function canCreate(): bool
{
    return false;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/SupportReadOnlyResourcesTest.php --filter=menu_and_lead`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/MenuResource* app/Filament/Resources/BaoGiaAndTuVanResource* tests/Feature/Filament/SupportReadOnlyResourcesTest.php
git commit -m "feat: add menu and lead admin resources"
```

### Task 9: Tích hợp media fields tối thiểu cho Product, Service, Article, Slide, KhachHang

**Files:**
- Modify: `laravel_api/app/Filament/Resources/ProductResource.php`
- Modify: `laravel_api/app/Filament/Resources/ServiceResource.php`
- Modify: `laravel_api/app/Filament/Resources/ArticleResource.php`
- Modify: `laravel_api/app/Filament/Resources/SlideResource.php`
- Modify: `laravel_api/app/Filament/Resources/KhachHangResource.php`
- Test: `laravel_api/tests/Feature/Filament/ProductResourceTest.php`
- Test: `laravel_api/tests/Feature/Filament/SupportReadOnlyResourcesTest.php`

- [ ] **Step 1: Write the failing test**

Thêm assertion form labels hoặc field xuất hiện:

```php
public function test_product_edit_page_shows_media_fields(): void
{
    $user = User::factory()->create();
    $product = Product::query()->create([
        'document_id' => 'product-1',
        'title' => 'Xe đẩy inox',
        'slug' => 'xe-day-inox',
    ]);

    $response = $this->actingAs($user)->get("/admin/products/{$product->getKey()}/edit");

    $response->assertOk();
    $response->assertSee('image');
    $response->assertSee('avatar');
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/Filament/ProductResourceTest.php --filter=media_fields`
Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

Phase đầu không cố write thẳng vào `files_related_mph` qua custom component phức tạp. Chỉ thêm các field phụ trợ ở form để:
- hiển thị media hiện có (placeholder/view field)
- cho phép nhập `document_id`/content cơ bản trước
- nếu cần upload thật thì tách riêng ở phase sau

Ví dụ trong `ProductResource`:

```php
Forms\Components\Placeholder::make('image_preview')
    ->label('image')
    ->content(fn (?Product $record) => $record?->image()?->url ?? 'No image'),
Forms\Components\Placeholder::make('avatar_preview')
    ->label('avatar')
    ->content(fn (?Product $record) => $record?->avatar()?->url ?? 'No avatar'),
```

Làm tương tự cho:
- `Service.image`
- `Article.cover`
- `Slide.image`
- `KhachHang.logo`

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/Filament/ProductResourceTest.php --filter=media_fields`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/ProductResource* app/Filament/Resources/ServiceResource* app/Filament/Resources/ArticleResource* app/Filament/Resources/SlideResource* app/Filament/Resources/KhachHangResource* tests/Feature/Filament/ProductResourceTest.php tests/Feature/Filament/SupportReadOnlyResourcesTest.php
git commit -m "feat: expose media previews in admin resources"
```

### Task 10: Verify panel end-to-end và tài liệu vận hành

**Files:**
- Modify: `docs/laravel-phase1-summary.md`
- Create: `docs/laravel-dashboard-admin.md`
- Test: toàn bộ test suite Filament vừa thêm

- [ ] **Step 1: Write the failing verification checklist**

Tạo `docs/laravel-dashboard-admin.md` với checklist vận hành:

```md
# Laravel Dashboard Admin

- [ ] Admin login works at /admin/login
- [ ] Dashboard loads after authentication
- [ ] Global settings editable
- [ ] Static pages CRUD works
- [ ] Products/services/articles list and edit work
- [ ] Slides/khach-hangs/about-uses list and edit work
- [ ] Menus list and edit work
- [ ] Leads list works
```

- [ ] **Step 2: Run tests to verify current gaps**

Run: `php artisan test tests/Feature/Filament`
Expected: nếu còn resource nào thiếu sẽ FAIL.

- [ ] **Step 3: Write minimal implementation**

Cập nhật doc với lệnh chạy thực tế:

```md
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
```

Cập nhật `docs/laravel-phase1-summary.md` để thêm mục “Next step approved: dashboard/admin plan with Filament-first approach”.

- [ ] **Step 4: Run tests to verify it passes**

Run: `php artisan test tests/Feature/Filament`
Expected: PASS.

Manual check:

```bash
php artisan serve --host=127.0.0.1 --port=8001
```

Mở `http://127.0.0.1:8001/admin/login`, đăng nhập bằng `admin@example.com / password`, kiểm tra:
- dashboard hiển thị widget
- truy cập được `/admin/static-pages`
- truy cập được `/admin/products`
- truy cập được `/admin/bao-gia-and-tu-vans`

- [ ] **Step 5: Commit**

```bash
git add docs/laravel-phase1-summary.md docs/laravel-dashboard-admin.md tests/Feature/Filament
git commit -m "docs: add dashboard admin runbook and verification"
```

---

## Ghi chú thiết kế
- `GlobalSetting` nên ưu tiên edit bản ghi hiện có thay vì cho create tràn lan. Nếu sau khi đọc DB thấy chỉ có một record thật, có thể ẩn nút create trong resource. Pattern này học từ `cab/routes/web.php` có các route settings riêng cho email/datetime/logo thay vì CRUD đầy đủ.
- `BaoGiaAndTuVan` là dữ liệu lead từ frontend, nên phase đầu chỉ cần list/view; không cần create bằng tay từ admin. Tương tự `cab` có `bookings` resource chủ yếu để xem.
- `Menu.items` là JSON lồng nhau. Phase đầu dùng `KeyValue` hoặc textarea JSON để tránh overbuild custom nested builder quá sớm. Sau này có thể học menu builder pattern từ `cab` (có `MenuController`, `MenuItemController`, route `menu-items/order`) nếu cần drag-drop UI.
- `HomePageContent` để phase sau, sau khi có mapping component thật và quyết định UI builder phù hợp.
- Media upload full fidelity vào bảng Strapi media chưa nên làm trong phase đầu. Chỉ hiển thị preview/read-only trước để giảm rủi ro phá contract API đang chạy.
- TailAdmin không dùng làm bước đầu vì starter Laravel của họ là app riêng. Nếu muốn giao diện TailAdmin sau này, nên áp dụng sau khi Filament CRUD core đã ổn định, theo một plan riêng về theming/layout.
- Navigation grouping trong Filament panel nên học từ `cab`: nhóm "Content" (posts/projects/categories/products/pages), nhóm "System" (roles/users/permissions/modules), nhóm "Settings" (email/datetime/logo/language). Áp dụng tương tự cho `laravel_api`: nhóm "Content" (products/services/articles/static-pages), nhóm "Media" (slides/khach-hangs), nhóm "Structure" (menus/globals), nhóm "Leads" (bao-gia-and-tu-vans).

## Verification matrix
- Auth:
  - `php artisan test tests/Feature/Filament/AdminAuthTest.php`
  - `php artisan test tests/Feature/Filament/DashboardAccessTest.php`
- Core resources:
  - `php artisan test tests/Feature/Filament/GlobalSettingResourceTest.php`
  - `php artisan test tests/Feature/Filament/StaticPageResourceTest.php`
  - `php artisan test tests/Feature/Filament/ProductResourceTest.php`
  - `php artisan test tests/Feature/Filament/ServiceResourceTest.php`
- Secondary resources:
  - `php artisan test tests/Feature/Filament/SupportReadOnlyResourcesTest.php`
- Full pass:
  - `php artisan test tests/Feature/Filament`

## Spec coverage self-review
- Đã cover admin bootstrap, auth, dashboard, CRUD cho toàn bộ content types chính đang có model thực tế.
- Đã giữ `home-page-content` ngoài scope do blocker component mapping.
- Đã chốt TailAdmin là optional follow-up, không lẫn vào bước bootstrap để tránh biến plan thành migration UI lớn.
- Không có placeholder kiểu TBD/TODO; từng task có file, test, command, expected outcome.
- Tên class/resource/form fields khớp model hiện có trong `laravel_api/app/Models`.
