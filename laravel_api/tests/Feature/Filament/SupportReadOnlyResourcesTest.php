<?php

namespace Tests\Feature\Filament;

use App\Models\AboutUs;
use App\Models\Article;
use App\Models\BaoGiaAndTuVan;
use App\Models\KhachHang;
use App\Models\Menu;
use App\Models\Slide;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class SupportReadOnlyResourcesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('slides', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->text('content')->nullable();
            $table->text('position')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('khach_hangs', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('website')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('about_uses', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('content')->nullable();
            $table->integer('order')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('items')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('bao_gia_and_tu_vans', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->text('content')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });
    }

    public function test_admin_can_view_support_resource_indexes(): void
    {
        $user = User::factory()->create();

        Article::query()->create([
            'document_id' => 'article-1',
            'title' => 'Tin tức 1',
        ]);

        Slide::query()->create([
            'document_id' => 'slide-1',
            'content' => 'Slide 1',
        ]);

        KhachHang::query()->create([
            'document_id' => 'kh-1',
            'title' => 'Khách hàng A',
        ]);

        AboutUs::query()->create([
            'document_id' => 'about-1',
            'title' => 'Về chúng tôi',
        ]);

        $this->actingAs($user)
            ->get('/admin/articles')
            ->assertOk()
            ->assertSee('Tin tức 1');

        $this->actingAs($user)
            ->get('/admin/slides')
            ->assertOk()
            ->assertSee('Slide 1');

        $this->actingAs($user)
            ->get('/admin/khach-hangs')
            ->assertOk()
            ->assertSee('Khách hàng A');

        $this->actingAs($user)
            ->get('/admin/about-uses')
            ->assertOk()
            ->assertSee('Về chúng tôi');
    }

    public function test_admin_can_view_menu_and_lead_indexes(): void
    {
        $user = User::factory()->create();

        Menu::query()->create([
            'document_id' => 'menu-1',
            'title' => 'Main Menu',
            'slug' => 'main-menu',
            'items' => [],
        ]);

        BaoGiaAndTuVan::query()->create([
            'document_id' => 'lead-1',
            'customer_name' => 'Nguyen Van A',
            'customer_phone' => '0900000000',
        ]);

        $this->actingAs($user)
            ->get('/admin/menus')
            ->assertOk()
            ->assertSee('Main Menu');

        $this->actingAs($user)
            ->get('/admin/bao-gia-and-tu-vans')
            ->assertOk()
            ->assertSee('Nguyen Van A');
    }
}
