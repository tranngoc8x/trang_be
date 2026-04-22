<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    use InteractsWithStrapiMedia;

    protected $table = 'khach_hangs';

    protected $fillable = [
        'document_id',
        'title',
        'website',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    public function logo(): ?File
    {
        return $this->firstMediaByField('logo');
    }

    protected function getStrapiType(): string
    {
        return 'api::khach-hang.khach-hang';
    }
}
