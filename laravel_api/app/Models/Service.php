<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    use InteractsWithStrapiMedia;

    protected $table = 'services';

    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'content',
        'show_in_home',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'show_in_home' => 'boolean',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_service_lnk', 'service_id', 'product_id');
    }

    public function image(): ?File
    {
        return $this->firstMediaByField('image');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeShowInHome(Builder $query): Builder
    {
        return $query->where('show_in_home', true);
    }

    protected function getStrapiType(): string
    {
        return 'api::service.service';
    }
}
