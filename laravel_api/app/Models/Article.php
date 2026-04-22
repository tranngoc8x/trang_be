<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use InteractsWithStrapiMedia;

    protected $table = 'articles';

    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'description',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function cover(): ?File
    {
        return $this->firstMediaByField('cover');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    protected function getStrapiType(): string
    {
        return 'api::article.article';
    }
}
