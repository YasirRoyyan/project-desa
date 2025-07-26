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
        Schema::create('syarat_format_surat', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('format_id')->nullable()->index();
            $table->unsignedBigInteger('syarat_id')->nullable()->index();
            $table->timestamps();

            $table->foreign('format_id')->references('id')->on('format_surat')->nullOnDelete();
            $table->foreign('syarat_id')->references('id')->on('syarat_surat')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('syarat_format_surat');
    }
};
