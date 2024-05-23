<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('witnesses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type_asset_id');
            $table->foreign('type_asset_id')->references('id')->on('type_assets');
            $table->unsignedBigInteger('commune_id');
            $table->foreign('commune_id')->references('id')->on('communes');
            $table->integer('category');
            $table->timestamp('publication_date');
            $table->string('address');
            $table->double('latitude');
            $table->double('longitude');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->double('construction_area');
            $table->double('terrain_area');
            $table->integer('value_pesos');
            $table->integer('value_uf');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('witnesses');
    }
};
