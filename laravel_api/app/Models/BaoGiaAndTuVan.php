<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaoGiaAndTuVan extends Model
{
    protected $table = 'bao_gia_and_tu_vans';

    protected $fillable = [
        'document_id',
        'customer_name',
        'customer_phone',
        'content',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:255',
            'content' => 'nullable|string',
        ];
    }
}
