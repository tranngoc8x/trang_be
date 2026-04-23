<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class MissingTableHandlingTest extends TestCase
{
    /**
     * Test that API endpoints handle missing tables gracefully.
     *
     * Context: products, services, static_pages tables don't exist in runtime DB.
     * Expected: Should return empty collection with 200, not 500.
     */
    public function test_api_products_handles_missing_table_gracefully(): void
    {
        // Verify table doesn't exist in runtime DB
        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('products', $tables, 'Test assumes products table does not exist');

        // API should return empty collection, not 500
        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [],
                'meta' => [
                    'pagination' => [
                        'total' => 0,
                    ],
                ],
            ]);
    }

    public function test_api_services_handles_missing_table_gracefully(): void
    {
        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('services', $tables, 'Test assumes services table does not exist');

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [],
                'meta' => [
                    'pagination' => [
                        'total' => 0,
                    ],
                ],
            ]);
    }

    public function test_api_static_pages_handles_missing_table_gracefully(): void
    {
        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('static_pages', $tables, 'Test assumes static_pages table does not exist');

        $response = $this->getJson('/api/static-pages');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [],
                'meta' => [
                    'pagination' => [
                        'total' => 0,
                    ],
                ],
            ]);
    }

    /**
     * Test that Filament resources handle missing tables gracefully.
     *
     * Expected: Should show empty table or graceful error, not 500.
     */
    public function test_admin_products_handles_missing_table_gracefully(): void
    {
        $user = \App\Models\User::first();
        $this->actingAs($user);

        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('products', $tables);

        // Should not return 500
        $response = $this->get('/admin/products');

        $this->assertNotEquals(500, $response->status(), 'Admin page should not return 500 for missing table');
    }

    public function test_admin_services_handles_missing_table_gracefully(): void
    {
        $user = \App\Models\User::first();
        $this->actingAs($user);

        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('services', $tables);

        $response = $this->get('/admin/services');

        $this->assertNotEquals(500, $response->status());
    }

    public function test_admin_static_pages_handles_missing_table_gracefully(): void
    {
        $user = \App\Models\User::first();
        $this->actingAs($user);

        $tables = array_map(
            fn($r) => array_values((array) $r)[0],
            DB::select('SHOW TABLES')
        );
        $this->assertNotContains('static_pages', $tables);

        $response = $this->get('/admin/static-pages');

        $this->assertNotEquals(500, $response->status());
    }
}
