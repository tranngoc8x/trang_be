<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use App\Models\Concerns\ResolvesComponents;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class HomePageContent extends Model
{
    use InteractsWithStrapiMedia;
    use ResolvesComponents {
        resolveComponentRecord as resolveComponentRecordWithoutCache;
    }

    protected $table = 'home_page_contents';

    protected $fillable = [
        'document_id',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @var array<string, object|null>
     */
    protected array $resolvedComponentRecordCache = [];

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at');
    }

    public function partner(): ?array
    {
        return null;
    }

    public function service(): ?array
    {
        return null;
    }

    public function aboutus(): ?array
    {
        return null;
    }

    public function news(): ?array
    {
        return null;
    }

    public function companyAchievement(): ?array
    {
        return null;
    }

    protected function getStrapiType(): string
    {
        return 'api::home-page-content.home-page-content';
    }
}
