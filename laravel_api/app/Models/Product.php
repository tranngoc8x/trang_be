<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use InteractsWithStrapiMedia;

    protected $table = 'products';

    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'description',
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

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'products_service_lnk', 'product_id', 'service_id');
    }

    public function image(): ?File
    {
        return $this->firstMediaByField('image');
    }

    public function avatar(): ?File
    {
        return $this->firstMediaByField('avatar');
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
        return 'api::product.product';
    }
}
