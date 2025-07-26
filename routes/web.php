<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuratController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/onboarding', function () {
    return Inertia::render('onboarding');
})->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('perizinan', function () {
        return Inertia::render('perizinan/index');
    })->name('perizinan.index');

    Route::prefix('api')->group(function () {
        Route::get('surat/format/{format_id}', [SuratController::class, 'getByFormatId']);
        Route::get('surat/{slug}', [SuratController::class, 'getBySlug']);
        Route::post('surat/{slug}', [SuratController::class, 'store']);
        Route::put('surat/{id}', [SuratController::class, 'update']);
        Route::delete('surat/{id}', [SuratController::class, 'destroy']);
    });
    
    Route::get('perizinan-acara', function () {
        return Inertia::render('perizinan-acara/index');
    })->name('perizinan-acara.index');

    Route::get('perizinan-bangunan', function () {
        return Inertia::render('perizinan-bangunan/index');
    })->name('perizinan-bangunan.index');

    Route::get('perizinan-pertanian', function () {
        return Inertia::render('perizinan-pertanian/index');
    })->name('perizinan-pertanian.index');

    Route::get('perizinan-pribadi', function () {
        return Inertia::render('perizinan-pribadi/index');
    })->name('perizinan-pribadi.index');
    
    Route::get('form-usaha', function () {
        return Inertia::render('form-usaha/index');
    })->name('form-usaha.index');
    
    Route::get('form-usaha/form/{type}', function (string $type) {
        return Inertia::render('form-usaha/form', [
            'type' => $type
        ]);
    })->name('form-usaha.form');
    
    Route::get('customers', function () {
        return Inertia::render('customers/index');
    })->name('customers.index');
    
    // Demo route for toast notifications
    Route::get('demo/toast', function () {
        return Inertia::render('demo/toast');
    })->name('demo.toast');
    
    // Test route for toast notifications
    Route::get('test-toast', function () {
        return Inertia::render('test-toast');
    })->name('test.toast');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
