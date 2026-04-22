# Laravel Models - Phase 1 (Đọc DB Strapi cũ)

**Ngày:** 2026-04-22  
**Mục tiêu:** Tạo Model Laravel đọc trực tiếp DB Strapi hiện tại, không thay đổi schema

---

## 1. Model cho Content chính

### Product.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Product extends Model
{
    protected $table = 'products';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'description',
        'show_in_home',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'show_in_home' => 'boolean',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    // Relationship: Product belongsToMany Service
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(
            Service::class,
            'products_service_lnk',
            'product_id',
            'service_id'
        );
    }
    
    // Relationship: Product morphToMany File (media)
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    // Accessor: lấy ảnh đại diện
    public function getThumbnailAttribute()
    {
        return $this->media()
            ->wherePivot('field', 'thumbnail')
            ->first();
    }
    
    // Scope: chỉ lấy published
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
    
    // Scope: hiển thị trang chủ
    public function scopeShowInHome($query)
    {
        return $query->where('show_in_home', true);
    }
}
```

---

### Service.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Service extends Model
{
    protected $table = 'services';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'content',
        'show_in_home',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'show_in_home' => 'boolean',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    // Relationship: Service belongsToMany Product
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(
            Product::class,
            'products_service_lnk',
            'service_id',
            'product_id'
        );
    }
    
    // Relationship: Service morphToMany File (media)
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
    
    public function scopeShowInHome($query)
    {
        return $query->where('show_in_home', true);
    }
}
```

---

### Article.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Article extends Model
{
    protected $table = 'articles';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'description',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### StaticPage.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class StaticPage extends Model
{
    protected $table = 'static_pages';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'content',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### AboutUs.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class AboutUs extends Model
{
    protected $table = 'about_uses';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'content',
        'order',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'order' => 'integer',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### Global.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class GlobalSetting extends Model
{
    protected $table = 'globals';
    
    protected $fillable = [
        'document_id',
        'site_name',
        'map',
        'footer_content',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    // Helper: lấy global setting duy nhất
    public static function current()
    {
        return static::whereNotNull('published_at')->first();
    }
}
```

---

### HomePageContent.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class HomePageContent extends Model
{
    protected $table = 'home_page_contents';
    
    protected $fillable = [
        'document_id',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### Slide.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Slide extends Model
{
    protected $table = 'slides';
    
    protected $fillable = [
        'document_id',
        'content',
        'position',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'position' => 'array',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### KhachHang.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class KhachHang extends Model
{
    protected $table = 'khach_hangs';
    
    protected $fillable = [
        'document_id',
        'title',
        'website',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function media(): MorphToMany
    {
        return $this->morphToMany(
            File::class,
            'related',
            'files_related_mph',
            'related_id',
            'file_id'
        )->withPivot('field', 'order')
          ->orderBy('order');
    }
    
    // Accessor: lấy logo
    public function getLogoAttribute()
    {
        return $this->media()
            ->wherePivot('field', 'logo')
            ->first();
    }
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

### BaoGiaAndTuVan.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaoGiaAndTuVan extends Model
{
    protected $table = 'bao_gia_and_tu_vans';
    
    protected $fillable = [
        'document_id',
        'customer_name',
        'customer_phone',
        'content',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    // Validation rules
    public static function rules()
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:255',
            'content' => 'nullable|string',
        ];
    }
}
```

---

### Menu.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menus';
    
    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'items',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'items' => 'array',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
```

---

## 2. Model cho Media

### File.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'files';
    
    protected $fillable = [
        'document_id',
        'name',
        'alternative_text',
        'caption',
        'width',
        'height',
        'formats',
        'hash',
        'ext',
        'mime',
        'size',
        'url',
        'preview_url',
        'provider',
        'provider_metadata',
        'folder_path',
        'published_at',
        'locale',
    ];
    
    protected $casts = [
        'formats' => 'array',
        'provider_metadata' => 'array',
        'width' => 'integer',
        'height' => 'integer',
        'size' => 'decimal:2',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    // Accessor: full URL
    public function getFullUrlAttribute()
    {
        if (str_starts_with($this->url, 'http')) {
            return $this->url;
        }
        return config('app.url') . $this->url;
    }
    
    // Accessor: thumbnail URL
    public function getThumbnailUrlAttribute()
    {
        if (isset($this->formats['thumbnail']['url'])) {
            $url = $this->formats['thumbnail']['url'];
            if (str_starts_with($url, 'http')) {
                return $url;
            }
            return config('app.url') . $url;
        }
        return $this->full_url;
    }
}
```

---

## 3. Cấu hình morphMap trong AppServiceProvider

```php
<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Map Strapi type names sang Laravel models
        Relation::morphMap([
            'api::product.product' => \App\Models\Product::class,
            'api::service.service' => \App\Models\Service::class,
            'api::article.article' => \App\Models\Article::class,
            'api::static-page.static-page' => \App\Models\StaticPage::class,
            'api::about-us.about-us' => \App\Models\AboutUs::class,
            'api::global.global' => \App\Models\GlobalSetting::class,
            'api::home-page-content.home-page-content' => \App\Models\HomePageContent::class,
            'api::slide.slide' => \App\Models\Slide::class,
            'api::khach-hang.khach-hang' => \App\Models\KhachHang::class,
            'api::bao-gia-and-tu-van.bao-gia-and-tu-van' => \App\Models\BaoGiaAndTuVan::class,
            'shared.rich-text' => \App\Models\Component\RichText::class,
            'shared.seo' => \App\Models\Component\Seo::class,
            'shared.article' => \App\Models\Component\Article::class,
            'shared.media' => \App\Models\Component\Media::class,
        ]);
    }
}
```

---

## 4. API Resources (Format response giống Strapi)

### ProductResource.php

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'showInHome' => $this->show_in_home,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
            'publishedAt' => $this->published_at?->toISOString(),
            'locale' => $this->locale,
            
            // Relations
            'services' => ServiceResource::collection($this->whenLoaded('services')),
            'media' => FileResource::collection($this->whenLoaded('media')),
            'thumbnail' => new FileResource($this->whenLoaded('thumbnail')),
        ];
    }
}
```

### ServiceResource.php

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'showInHome' => $this->show_in_home,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
            'publishedAt' => $this->published_at?->toISOString(),
            'locale' => $this->locale,
            
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'media' => FileResource::collection($this->whenLoaded('media')),
        ];
    }
}
```

### FileResource.php

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'name' => $this->name,
            'alternativeText' => $this->alternative_text,
            'caption' => $this->caption,
            'width' => $this->width,
            'height' => $this->height,
            'formats' => $this->formats,
            'hash' => $this->hash,
            'ext' => $this->ext,
            'mime' => $this->mime,
            'size' => $this->size,
            'url' => $this->url,
            'previewUrl' => $this->preview_url,
            'provider' => $this->provider,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
```

---

## 5. Controllers mẫu

### ProductController.php

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->published()
            ->with(['services', 'media']);
        
        // Filter: show_in_home
        if ($request->boolean('showInHome')) {
            $query->showInHome();
        }
        
        // Pagination
        $perPage = $request->input('pageSize', 25);
        $products = $query->paginate($perPage);
        
        return ProductResource::collection($products);
    }
    
    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->published()
            ->with(['services', 'media'])
            ->firstOrFail();
        
        return new ProductResource($product);
    }
}
```

### BaoGiaAndTuVanController.php

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BaoGiaAndTuVan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BaoGiaAndTuVanController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), BaoGiaAndTuVan::rules());
        
        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'status' => 400,
                    'name' => 'ValidationError',
                    'message' => 'Validation failed',
                    'details' => $validator->errors(),
                ],
            ], 400);
        }
        
        $baoGia = BaoGiaAndTuVan::create([
            'customer_name' => $request->input('customer_name'),
            'customer_phone' => $request->input('customer_phone'),
            'content' => $request->input('content'),
            'published_at' => now(),
        ]);
        
        return response()->json([
            'data' => [
                'id' => $baoGia->id,
                'documentId' => $baoGia->document_id,
            ],
        ], 201);
    }
}
```

---

## 6. Routes (routes/api.php)

```php
<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\StaticPageController;
use App\Http\Controllers\Api\GlobalController;
use App\Http\Controllers\Api\HomePageContentController;
use App\Http\Controllers\Api\BaoGiaAndTuVanController;
use Illuminate\Support\Facades\Route;

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Services
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

// Articles
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

// Static Pages
Route::get('/static-pages/{slug}', [StaticPageController::class, 'show']);

// Global settings
Route::get('/globals', [GlobalController::class, 'show']);

// Home page content
Route::get('/home-page-contents', [HomePageContentController::class, 'index']);

// Form liên hệ
Route::post('/bao-gia-and-tu-vans', [BaoGiaAndTuVanController::class, 'store']);
```

---

## 7. Checklist triển khai Phase 1

- [ ] Tạo Laravel project mới (Laravel 11.x)
- [ ] Cấu hình `.env` kết nối DB hiện tại
- [ ] Copy 12 Model files vào `app/Models/`
- [ ] Copy 3 Resource files vào `app/Http/Resources/`
- [ ] Copy 2 Controller mẫu vào `app/Http/Controllers/Api/`
- [ ] Thêm morphMap vào `AppServiceProvider`
- [ ] Thêm routes vào `routes/api.php`
- [ ] Test từng endpoint với Postman/curl
- [ ] So sánh response Laravel vs Strapi
- [ ] Điều chỉnh Resource nếu format khác
- [ ] Chạy song song Laravel + Strapi để A/B test
- [ ] Khi Laravel ổn định → chuyển frontend sang base URL mới

---

## 8. Lưu ý quan trọng

### 8.1. Không được sửa DB trong Phase 1
- Laravel chỉ **đọc/ghi** trên schema hiện tại
- Không drop bảng, không drop FK
- Không alter column

### 8.2. morphMap là bắt buộc
- Strapi lưu `related_type` dạng `api::product.product`
- Laravel mặc định dùng class name đầy đủ
- Phải map để đọc đúng relation

### 8.3. Xử lý `created_by_id` / `updated_by_id`
- Hiện tại các bảng content có FK tới `admin_users`
- Laravel có thể bỏ qua (nullable) hoặc giữ tạm
- Khi làm admin Laravel sẽ migrate sang `users` table mới

### 8.4. Xử lý components
- Các bảng `*_cmps` và `components_shared_*` chưa cần động tới
- Phase 1 chỉ cần trả về content chính
- Phase 3 mới flatten components

### 8.5. Testing
- Dùng Postman collection của Strapi làm baseline
- So sánh từng field trong response
- Đặc biệt chú ý:
  - Date format (ISO 8601)
  - Nested relations
  - Media URLs
  - Pagination format

---

## 9. Bước tiếp theo sau Phase 1

Khi API Laravel đã ổn định:

1. **Phase 2:** Xây admin panel (Filament/Nova)
2. **Phase 3:** Flatten components sang JSON hoặc bảng riêng
3. **Phase 4:** Drop FK tới `admin_users`, migrate auth sang Laravel
4. **Phase 5:** Drop toàn bộ bảng Strapi internal
5. **Phase 6:** Optimize indexes, cleanup schema

---

**Kết luận Phase 1:** Với danh sách Model + Resource + Controller trên, Laravel có thể clone được 90% API Strapi mà không cần thay đổi DB.
