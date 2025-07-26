<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\FormatSurat;

class FormatSuratController extends Controller
{
    public function index($kategori)
    {
        $formats = FormatSurat::with('kategori', 'syarat')
            ->where('kategori_id', $kategori)
            // ->orWhereHas('kategori', function ($query) {
            //     $query->where('nama', 'Perizinan Usaha');
            // })
            ->get();

        return response()->json($formats);
    }

    public function show ($slug) {
        $format = FormatSurat::with('syarat')
            ->where('url_surat', $slug)
            ->first();

        return response()->json([
            'id' => $format->id,
            'nama' => $format->nama,
            'url_surat' => $format->url_surat,
            'deskripsi' => $format->deskripsi,
            'form' => $format->form_isian,
            'syarat' => $format->syarat
        ], 200);
    }

    public function store (Request $req) {

    }
}