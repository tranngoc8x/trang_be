<?php

namespace App\Models\Concerns;

use App\Models\File;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

trait InteractsWithStrapiMedia
{
    protected array $mediaCache = [];

    /**
     * Lấy tất cả media của model này từ bảng files_related_mph
     */
    public function strapiMedia(): HasMany
    {
        return $this->hasMany(
            \Illuminate\Database\Eloquent\Model::class,
            'related_id',
            'id'
        )->from('files_related_mph')
         ->where('related_type', $this->getStrapiType());
    }

    /**
     * Lấy media theo field cụ thể
     */
    public function mediaByField(string $field): Collection
    {
        return File::query()
            ->join('files_related_mph', 'files.id', '=', 'files_related_mph.file_id')
            ->where('files_related_mph.related_type', $this->getStrapiType())
            ->where('files_related_mph.related_id', $this->id)
            ->where('files_related_mph.field', $field)
            ->orderBy('files_related_mph.order')
            ->select('files.*')
            ->get();
    }

    public static function preloadMediaForCollection(Collection $models, array $fields): void
    {
        if ($models->isEmpty() || empty($fields)) {
            return;
        }

        $fields = array_values(array_unique($fields));
        $ids = $models->pluck('id')->filter()->unique()->values();

        if ($ids->isEmpty()) {
            return;
        }

        $first = $models->first();
        $mediaRecords = File::query()
            ->join('files_related_mph', 'files.id', '=', 'files_related_mph.file_id')
            ->where('files_related_mph.related_type', $first->getStrapiType())
            ->whereIn('files_related_mph.related_id', $ids)
            ->whereIn('files_related_mph.field', $fields)
            ->orderBy('files_related_mph.order')
            ->select('files.*', 'files_related_mph.related_id', 'files_related_mph.field')
            ->get();

        $grouped = $mediaRecords->groupBy(function ($item) {
            return $item->related_id.'::'.$item->field;
        });

        foreach ($models as $model) {
            foreach ($fields as $field) {
                $cacheKey = $model->id.'::'.$field;
                $model->mediaCache[$field] = $grouped->get($cacheKey)?->first();
            }
        }
    }

    /**
     * Lấy media đầu tiên theo field
     */
    public function firstMediaByField(string $field): ?File
    {
        if (array_key_exists($field, $this->mediaCache)) {
            return $this->mediaCache[$field];
        }

        $media = $this->mediaByField($field)->first();
        $this->mediaCache[$field] = $media;

        return $media;
    }

    /**
     * Trả về Strapi type name của model này
     * Ví dụ: api::product.product
     */
    abstract protected function getStrapiType(): string;
}
