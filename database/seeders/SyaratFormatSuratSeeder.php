<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SyaratFormatSuratSeeder extends Seeder
{
    public function run(): void
    {
        $formats = [
            1 => [1, 2, 16, 17], // SKU
            2 => [1, 2, 16, 17], // IUMK
            3 => [2, 14, 15, 16], // SITU
            4 => [2, 12, 13, 14], // NIB
            12 => [1, 2, 17, 22], // SKCK
            13 => [1, 2, 17, 21], // Domisili
            14 => [1, 2, 17, 20], // Pendatang
            15 => [1, 2, 18, 19], // Luar negeri
            16 => [1, 2, 17, 20] // Tidak bekerja
        ];

        foreach ($formats as $formatId => $syaratIds) {
            foreach ($syaratIds as $syaratId) {
                DB::table('syarat_format_surat')->insert([
                    'format_id' => $formatId,
                    'syarat_id' => $syaratId,
                ]);
            }
        }
    }
}
