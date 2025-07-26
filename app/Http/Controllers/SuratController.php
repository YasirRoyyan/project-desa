<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\FormatSurat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SuratController extends Controller
{
    /**
     * Get surat data by format_id
     */
    public function getByFormatId($format_id)
    {
        try {
            // Tambahkan 'penduduk' ke dalam with()
            $query = Surat::with(['format', 'penduduk'])->where('format_id', $format_id);

            $surats = $query->latest()->get()->map(function ($surat) {
                // Handle form_isian processing
                $formIsian = $surat->format->form_isian ?? [];
                $suratForm = $surat->form ?? [];

                // Only process if form_isian is an array
                if (is_array($formIsian)) {
                    $formIsianKeys = array_values($formIsian);
                    $defaultForm = array_fill_keys($formIsianKeys, null);
                    $surat->form = array_merge($defaultForm, $suratForm);
                }

                return $surat;
            });

            return response()->json([
                'message' => 'Daftar surat berhasil ditampilkan',
                'total' => $surats->count(),
                'diproses' => $surats->where('status', 'diproses')->count(),
                'disetujui' => $surats->where('status', 'disetujui')->count(),
                'ditolak' => $surats->where('status', 'ditolak')->count(),
                'data' => $surats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get surat data by slug (alternative method)
     */
    public function getBySlug($slug)
    {
        try {
            // Tambahkan 'penduduk' ke dalam with()
            $query = Surat::with(['format', 'penduduk'])
                ->whereHas('format', function ($q) use ($slug) {
                    $q->where('url_surat', $slug);
                });

            $surats = $query->latest()->get()->map(function ($surat) {
                $formIsian = $surat->format->form_isian ?? [];
                $suratForm = $surat->form ?? [];

                if (is_array($formIsian)) {
                    $formIsianKeys = array_values($formIsian);
                    $defaultForm = array_fill_keys($formIsianKeys, null);
                    $surat->form = array_merge($defaultForm, $suratForm);
                }

                return $surat;
            });

            return response()->json([
                'message' => 'Daftar surat berhasil ditampilkan',
                'total' => $surats->count(),
                'diproses' => $surats->where('status', 'diproses')->count(),
                'disetujui' => $surats->where('status', 'disetujui')->count(),
                'ditolak' => $surats->where('status', 'ditolak')->count(),
                'data' => $surats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new surat
     */
    public function store(Request $request, $slug)
    {
        try {
            // Cari format_surat berdasarkan slug
            $format = FormatSurat::where('url_surat', $slug)->firstOrFail();

            // Validasi data permintaan
            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
            ]);

            // Tambahkan format_id dari hasil query slug
            $validated['format_id'] = $format->id;
            $validated['created_by'] = Auth::id();
            $validated['updated_by'] = Auth::id();

            // Simpan surat baru
            $surat = Surat::create($validated);

            // Load relasi untuk response
            $surat->load(['format', 'penduduk']);

            return response()->json([
                'message' => 'Surat berhasil disimpan',
                'data' => $surat
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Format dengan slug '{$slug}' tidak ditemukan"
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show surat data by slug (for web view)
     */
    public function show($slug)
    {
        try {
            // Tambahkan 'penduduk' ke dalam with()
            $surats = Surat::with(['format', 'penduduk'])
                ->whereHas('format', function ($query) use ($slug) {
                    $query->where('url_surat', $slug);
                })
                ->latest()
                ->get();

            return response()->json([
                'message' => 'Daftar surat berdasarkan format berhasil ditampilkan',
                'total' => $surats->count(),
                'diproses' => $surats->where('status', 'diproses')->count(),
                'disetujui' => $surats->where('status', 'disetujui')->count(),
                'ditolak' => $surats->where('status', 'ditolak')->count(),
                'data' => $surats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update surat
     */
    public function update(Request $request, $id)
    {
        try {
            $item = Surat::findOrFail($id);

            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
            ]);

            $validated['updated_by'] = Auth::id();

            $item->update($validated);

            // Load relasi untuk response
            $item->load(['format', 'penduduk']);

            return response()->json([
                'message' => 'Surat berhasil diperbarui',
                'data' => $item
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete surat
     */
    public function destroy($id)
    {
        try {
            $surat = Surat::findOrFail($id);
            $surat->delete();

            return response()->json([
                'message' => 'Surat berhasil dihapus'
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Surat tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus surat',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}