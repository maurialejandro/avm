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
        Schema::create('appreciations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('users_id');
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('type_assets_id');
            $table->foreign('type_assets_id')->references('id')->on('type_assets');
            $table->unsignedBigInteger('access_code_id');
            $table->foreign('access_code_id')->references('id')->on('access_codes')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('commune_id');
            $table->foreign('commune_id')->references('id')->on('communes');
            $table->string('address');
            $table->integer('address_number');
            $table->string('rol');
            $table->double('terrain_area');
            $table->double('construction_area');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->double('latitude');
            $table->double('longitude');
            $table->integer('status');
            $table->double('value_uf_saved');
            $table->double('value_uf_reference');
            $table->double('value_uf_valoranet');
            $table->double('value_uf_report');
            $table->double('quality');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appreciations');
    }
};
