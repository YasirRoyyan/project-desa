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
        Schema::create('format_surat', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('config_id')->nullable()->index();

            $table->string('nama');
            $table->string('deskripsi')->nullable();
            $table->unsignedBigInteger('kategori_id')->nullable();
            $table->string('url_surat')->index();
            $table->string('kode_surat', 10)->nullable();
            $table->string('lampiran')->nullable();
            $table->integer('biaya')->default(0);

            $table->boolean('kunci')->default(false);
            $table->boolean('favorit')->default(false);
            $table->tinyInteger('jenis')->default(2);
            $table->boolean('mandiri')->nullable()->default(false);
            $table->integer('masa_berlaku')->nullable()->default(1);
            $table->string('satuan_masa_berlaku', 15)->nullable()->default('M');
            $table->boolean('qr_code')->default(false);
            $table->boolean('logo_garuda')->default(false);
            $table->boolean('kecamatan')->default(false);

            $table->longText('template')->nullable();
            $table->longText('template_desa')->nullable();
            $table->json('form_isian')->nullable();
            $table->longText('kode_isian')->nullable();

            $table->enum('orientasi', ['portrait', 'landscape'])->default('portrait');
            $table->string('ukuran', 10)->nullable();
            $table->text('margin')->nullable();
            $table->boolean('margin_global')->nullable()->default(false);

            $table->integer('footer')->default(1);
            $table->integer('header')->default(1);

            $table->string('format_nomor', 100)->nullable();
            $table->tinyInteger('format_nomor_global')->nullable()->default(1);
            $table->boolean('sumber_penduduk_berulang')->nullable()->default(false);

            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            // Relasi ke users
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();
            $table->timestamps();
            
            $table->foreign('kategori_id')->references('id')->on('kategori_surat')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('format_surat');
    }
};
