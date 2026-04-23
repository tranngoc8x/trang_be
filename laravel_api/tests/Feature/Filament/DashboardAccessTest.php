<?php

namespace Tests\Feature\Filament;

use App\Models\User;
use Tests\TestCase;

class DashboardAccessTest extends TestCase
{
    public function test_guest_admin_redirects_to_login(): void
    {
        $this->get('/admin')
            ->assertRedirect('/admin/login');
    }

    public function test_authenticated_admin_can_access_dashboard(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
            ],
        );

        $this->actingAs($user)
            ->get('/admin')
            ->assertOk();
    }
}
