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
