<?php

namespace App\Models;

use App\Models\Concerns\InteractsWithStrapiMedia;
use App\Models\Concerns\ResolvesComponents;
use App\Models\Concerns\ResolvesSeo;
use Illuminate\Database\Eloquent\Model;

class GlobalSetting extends Model
{
    use InteractsWithStrapiMedia;
    use ResolvesComponents;
    use ResolvesSeo;

    protected $table = 'globals';

    protected $fillable = [
        'document_id',
        'site_name',
        'map',
        'footer_content',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function current(): ?self
    {
        return static::whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->first();
    }

    public function favicon(): ?File
    {
        return $this->firstMediaByField('favicon');
    }

    public function logo(): ?File
    {
        return $this->firstMediaByField('logo');
    }

    public function logo2(): ?File
    {
        return $this->firstMediaByField('logo2');
    }

    public function defaultSeo(): ?array
    {
        return $this->resolveSeo('defaultSeo');
    }

    protected function getStrapiType(): string
    {
        return 'api::global.global';
    }
}
