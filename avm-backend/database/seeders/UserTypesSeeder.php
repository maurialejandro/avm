<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [ ['name' => 'administrator_coordinator'], ['name' => 'administrator_supervisor'], ['name' => 'client'] ];
        DB::table('user_types')->insert($data);
    }
}
