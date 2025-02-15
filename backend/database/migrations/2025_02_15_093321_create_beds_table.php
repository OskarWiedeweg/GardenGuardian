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
        Schema::create('beds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('size');
            $table->foreignIdFor(\App\Models\Garden::class)->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
        });
        Schema::create('bed_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignIdFor(\App\Models\Garden::class)->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
        });
        Schema::create('bed_category_bed', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Bed::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\BedCategory::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bed_category_bed');
        Schema::dropIfExists('bed_categories');
        Schema::dropIfExists('beds');
    }
};
