<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use InteractsWithStrapiMedia;

    protected $table = 'slides';

    protected $fillable = [
        'document_id',
        'content',
        'published_at',
        'locale',
        'position',
    ];

    protected $casts = [
        'position' => 'array',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    public function image(): ?File
    {
        return $this->firstMediaByField('image');
    }

    protected function getStrapiType(): string
    {
        return 'api::slide.slide';
    }
}
