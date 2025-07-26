<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\FormatSuratController;

// Route::get('/surat/{slug}', [SuratController::class, 'index']);
// Route::post('/surat/{slug}', [SuratController::class, 'store']);
// Route::put('/surat/{id}', [SuratController::class, 'update']);
// Route::delete('/surat/{id}', [SuratController::class, 'destroy']);

Route::prefix('api')->group(function () {
        Route::get('surat/{slug}', [SuratController::class, 'getBySlug']);
        Route::post('surat/{slug}', [SuratController::class, 'store']); 
        Route::put('surat/{id}', [SuratController::class, 'update']);
        Route::delete('surat/{id}', [SuratController::class, 'destroy']);
    });

Route::get('/penduduk', [PendudukController::class, 'index']);
Route::post('/penduduk', [PendudukController::class, 'store']);
Route::put('/penduduk/{id}', [PendudukController::class, 'update']);
Route::delete('/penduduk/{id}', [PendudukController::class, 'destroy']);

Route::get('/format-surat/{kategori}', [FormatSuratController::class, 'index']);
Route::get('/format-surat/form/{slug}', [FormatSuratController::class, 'show']);