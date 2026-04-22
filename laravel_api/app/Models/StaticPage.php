<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use App\Models\Concerns\ResolvesComponents;
use App\Models\Concerns\ResolvesSeo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class StaticPage extends Model
{
    use InteractsWithStrapiMedia;
    use ResolvesComponents;
    use ResolvesSeo;

    protected $table = 'static_pages';

    protected $fillable = [
        'document_id',
        'title',
        'slug',
        'content',
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

    public function seo(): ?array
    {
        return $this->resolveSeo('SEO');
    }

    protected function getStrapiType(): string
    {
        return 'api::static-page.static-page';
    }
}
