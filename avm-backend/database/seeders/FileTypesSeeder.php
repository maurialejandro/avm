<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FileTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [ ['name' => 'INFORME VISADO'], ['name' => 'INFORME TEMPORAL'] ];
        DB::table('file_types')->insert($data);
    }
}
