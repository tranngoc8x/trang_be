<?php

namespace Tests\Feature\Filament;

use App\Models\GlobalSetting;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class GlobalSettingResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('globals', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->nullable();
            $table->string('site_name')->nullable();
            $table->text('map')->nullable();
            $table->text('footer_content')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('locale', 20)->nullable();
            $table->timestamps();
        });
    }

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
