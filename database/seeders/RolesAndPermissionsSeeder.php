<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permissions
        $permissions = [
            ['name' => 'View Dashboard', 'slug' => 'dashboard.view', 'module' => 'Dashboard'],
            ['name' => 'View Users', 'slug' => 'users.view', 'module' => 'Users'],
            ['name' => 'Create Users', 'slug' => 'users.create', 'module' => 'Users'],
            ['name' => 'Edit Users', 'slug' => 'users.edit', 'module' => 'Users'],
            ['name' => 'Delete Users', 'slug' => 'users.delete', 'module' => 'Users'],
        ];

        foreach ($permissions as $p) {
            \App\Models\Permission::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // Roles
        $adminRole = \App\Models\Role::updateOrCreate(['slug' => 'admin'], ['name' => 'Administrator']);
        $managerRole = \App\Models\Role::updateOrCreate(['slug' => 'manager'], ['name' => 'Manager']);
        $userRole = \App\Models\Role::updateOrCreate(['slug' => 'user'], ['name' => 'User']);

        // Assign Permissions to Roles
        $allPermissions = \App\Models\Permission::all();
        $adminRole->permissions()->sync($allPermissions->pluck('id'));
        
        $managerPermissions = \App\Models\Permission::whereIn('slug', ['dashboard.view', 'users.view', 'users.edit'])->pluck('id');
        $managerRole->permissions()->sync($managerPermissions);

        $userPermissions = \App\Models\Permission::whereIn('slug', ['dashboard.view'])->pluck('id');
        $userRole->permissions()->sync($userPermissions);

        // Assign Admin role to the first user
        $user = \App\Models\User::first();
        if ($user) {
            $user->roles()->sync([$adminRole->id]);
        }
    }
}
