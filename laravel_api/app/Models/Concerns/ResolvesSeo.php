<?php

namespace App\Models\Concerns;

use App\Models\File;

trait ResolvesSeo
{
    protected function resolveSeo(string $field = 'SEO'): ?array
    {
        $record = $this->resolveComponentRecord($field, 'shared.seo', 'components_shared_seos');

        if (!$record) {
            return null;
        }

        $shareImage = File::query()
            ->join('files_related_mph', 'files.id', '=', 'files_related_mph.file_id')
            ->where('files_related_mph.related_type', 'shared.seo')
            ->where('files_related_mph.related_id', $record->id)
            ->where('files_related_mph.field', 'shareImage')
            ->orderBy('files_related_mph.order')
            ->select('files.*')
            ->first();

        return [
            'id' => $record->id,
            'metaTitle' => $record->metaTitle ?? $record->meta_title ?? null,
            'metaDescription' => $record->metaDescription ?? $record->meta_description ?? null,
            'shareImage' => $shareImage,
        ];
    }
}
