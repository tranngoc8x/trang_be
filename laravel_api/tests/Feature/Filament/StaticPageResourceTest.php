<?php

namespace Tests\Feature\Filament;

use App\Models\StaticPage;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class StaticPageResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('static_pages', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('content')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });
    }

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
