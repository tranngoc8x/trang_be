<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaticPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,
            'SEO' => $this->mapSeo($this->seo()),
        ];
    }

    private function mapSeo(?array $seo): ?array
    {
        if (!$seo) {
            return null;
        }

        return [
            'id' => $seo['id'] ?? null,
            'metaTitle' => $seo['metaTitle'] ?? null,
            'metaDescription' => $seo['metaDescription'] ?? null,
            'shareImage' => !empty($seo['shareImage']) ? new FileResource($seo['shareImage']) : null,
        ];
    }
}
