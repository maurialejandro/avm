<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'user_types_id' => 1,
                'name' => 'Test Coordinador',
                'email' => 'test.coordinator@valuaciones.cl',
                'email_verified_at' => now(),
                'rut' => null,
                'password' => Hash::make('qwerty123'),
                'phone' => '958977661',
                'remember_token' => null,
                'deleted_at' => null,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'user_types_id' => 3,
                'name' => 'Test Client',
                'email' => 'test.client@valuaciones.cl',
                'email_verified_at' => now(),
                'rut' => '77164602-6',
                'phone' => '958977661',
                'password' => null,
                'remember_token' => null,
                'deleted_at' => null,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'user_types_id' => 2,
                'name' => 'Test Supervisor',
                'email' => 'test.supervisor@valuaciones.cl',
                'email_verified_at' => now(),
                'rut' => null,
                'password' => Hash::make('qwerty123'),
                'phone' => '958977661',
                'remember_token' => null,
                'deleted_at' => null,
                'created_at' => null,
                'updated_at' => null,
            ]
        ];
        DB::table('users')->insert($data);
    }
}
