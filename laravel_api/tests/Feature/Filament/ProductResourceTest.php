<?php

namespace Tests\Feature\Filament;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class ProductResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->boolean('show_in_home')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('alternative_text')->nullable();
            $table->string('caption')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->json('formats')->nullable();
            $table->string('hash')->nullable();
            $table->string('ext')->nullable();
            $table->string('mime')->nullable();
            $table->decimal('size', 10, 2)->nullable();
            $table->string('url')->nullable();
            $table->string('preview_url')->nullable();
            $table->string('provider')->nullable();
            $table->json('provider_metadata')->nullable();
            $table->string('folder_path')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        Schema::create('files_related_mph', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('related_id');
            $table->string('related_type');
            $table->string('field');
            $table->integer('order')->default(1);
        });
    }

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
