<?php

namespace Tests\Feature\Filament;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class ServiceResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('content')->nullable();
            $table->boolean('show_in_home')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });
    }

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
