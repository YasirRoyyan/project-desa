<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\FormatSurat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SuratController extends Controller
{
    public function index($slug)
    {
        $surats = Surat::with('format')
            ->whereHas('format', function ($query) use ($slug) {
                $query->where('url_surat', $slug);
            })
            ->latest()
            ->get()
            ->map(function ($surat) {
                $formIsian = $surat->format->form_isian ?? [];
                $suratForm = $surat->form ?? [];

                // Extract 'name' values from the form_isian array of objects
                $formIsianKeys = [];
                foreach ($formIsian as $item) {
                    if (isset($item['name'])) {
                        $formIsianKeys[] = $item['name'];
                    }
                }

                // Create a default form array with all expected keys set to null
                $defaultForm = array_fill_keys($formIsianKeys, null);

                // Merge so missing fields from form_isian are included with null
                // existing values from suratForm will override nulls from defaultForm
                $surat->form = array_merge($defaultForm, $suratForm);

                return $surat;
            });

        return response()->json([
            'message' => 'Daftar surat berdasarkan format berhasil ditampilkan',
            'total' => $surats->count(),
            'diproses' => $surats->where('status', 'diproses')->count(),
            'disetujui' => $surats->where('status', 'disetujui')->count(),
            'ditolak' => $surats->where('status', 'ditolak')->count(),
            'data' => $surats
        ], 200);
    }

    public function store(Request $request, $slug)
    {
        try {
            $format = FormatSurat::where('url_surat', $slug)->firstOrFail();

            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'syarat.*'      => 'file|mimes:jpeg,png,jpg,gif,svg,pdf|max:5120', // Validate each uploaded file
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
            ]);

            $validated['format_id'] = $format->id;
            $validated['created_by'] = Auth::id();
            $validated['updated_by'] = Auth::id();

            $storedSyarat = [];

            // Handle file uploads for 'syarat'
            if ($request->hasFile('syarat')) {
                foreach ($request->file('syarat') as $key => $file) {
                    // Check if the file is valid and exists
                    if ($file && $file->isValid()) {
                        // Store the file in the 'public' disk under a 'syarat' directory
                        // The path will be 'syarat/{filename.extension}'
                        $path = $file->store('syarat', 'public');

                        // Get the public URL of the stored file
                        // This assumes your public disk is configured to serve files via URL
                        $url = Storage::disk('public')->url($path);

                        // Store the URL with the original key
                        $storedSyarat[$key] = $url;
                    }
                }
            }

            // Assign the processed 'syarat' array to the validated data
            // If the 'syarat' column in your Surat model is cast to 'array' or 'json',
            // Laravel will automatically handle the JSON encoding for storage.
            // If not, you would need to json_encode($storedSyarat) here.
            $validated['syarat'] = $storedSyarat;

            $surat = Surat::create($validated);

            return response()->json([
                'message' => 'Surat berhasil disimpan',
                'data' => $surat
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
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

    public function show($slug)
    {
        
    }

    public function update(Request $request, $id)
    {
        try {
            // Find the existing Surat record by its ID
            $surat = Surat::findOrFail($id);

            // Validate the request data
            // Note: format_id and created_by are typically not updated here.
            // 'syarat' validation is for new file uploads.
            // 'syarat_to_remove' is for explicit deletion of existing files.
            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array', // This array will contain NEW files
                'syarat.*'      => 'file|mimes:jpeg,png,jpg,gif,svg,pdf|max:5120', // Max 5MB per file
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
                'syarat_to_remove' => 'nullable|array', // Array of keys (e.g., '1', '2') to remove
                'syarat_to_remove.*' => 'string', // Ensure each item in this array is a string key
            ]);

            $currentSyarat = $surat->syarat ?? [];
            $finalSyarat = $currentSyarat;

            // --- Step 1: Handle explicit file removals ---
            if (isset($validated['syarat_to_remove']) && is_array($validated['syarat_to_remove'])) {
                foreach ($validated['syarat_to_remove'] as $keyToRemove) {
                    // Check if the key exists in the current 'syarat' data
                    if (isset($finalSyarat[$keyToRemove])) {
                        // Extract the file path from the URL.
                        // We remove the base URL part (e.g., 'http://127.0.0.1:8000/storage/')
                        // to get the relative path (e.g., 'syarat/filename.png').
                        $pathToDelete = str_replace(Storage::disk('public')->url('/'), '', $finalSyarat[$keyToRemove]);

                        // Check if the file actually exists in storage before attempting to delete
                        if (Storage::disk('public')->exists($pathToDelete)) {
                            Storage::disk('public')->delete($pathToDelete);
                        }
                        unset($finalSyarat[$keyToRemove]);
                    }
                }
            }

            if ($request->hasFile('syarat')) {
                foreach ($request->file('syarat') as $key => $file) {
                    if ($file && $file->isValid()) {
                        if (isset($finalSyarat[$key])) {
                            $oldPath = str_replace(Storage::disk('public')->url('/'), '', $finalSyarat[$key]);
                            if (Storage::disk('public')->exists($oldPath)) {
                                Storage::disk('public')->delete($oldPath);
                            }
                        }

                        // Store the new file in the 'public' disk under a 'syarat' directory.
                        $path = $file->store('syarat', 'public');
                        // Get the public URL of the newly stored file.
                        $url = Storage::disk('public')->url($path);

                        // Update the final 'syarat' array with the new file's URL.
                        $finalSyarat[$key] = $url;
                    }
                }
            }

            $updateData = $validated;
            // Remove 'syarat_to_remove' from the data that will be passed to the update method,
            // as it's a temporary field for processing removals.
            unset($updateData['syarat_to_remove']);

            $updateData['syarat'] = $finalSyarat;
            $updateData['updated_by'] = Auth::id();

            $surat->update($updateData);

            return response()->json([
                'message' => 'Surat berhasil diperbarui',
                'data' => $surat
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => "Surat dengan ID '{$id}' tidak ditemukan"
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $surat = Surat::findOrFail($id);
            $surat->delete();

            return response()->json([
                'message' => 'Surat berhasil dihapus'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Surat tidak ditemukan'], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus surat',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
