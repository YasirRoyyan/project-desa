<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\SyaratSurat;
use App\Models\KategoriSurat;

class FormatSurat extends Model
{
    use HasFactory;
    protected $table = "format_surat";

    protected $casts = [
        'form_isian' => 'array',
    ];

    public function getForm()
    {
        return $this->form_isian ?? [];
    }

    public function syarat()
    {
        return $this->belongsToMany(SyaratSurat::class, 'syarat_format_surat', 'format_id', 'syarat_id');
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriSurat::class);
    }
}
