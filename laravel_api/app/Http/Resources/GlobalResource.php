<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GlobalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $favicon = $this->favicon();
        $logo = $this->logo();
        $logo2 = $this->logo2();

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'siteName' => $this->site_name,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'map' => $this->map,
            'footer_content' => $this->footer_content,
            'favicon' => $favicon ? new FileResource($favicon) : null,
            'defaultSeo' => $this->mapDefaultSeo($this->defaultSeo()),
            'logo' => $logo ? new FileResource($logo) : null,
            'logo2' => $logo2 ? new FileResource($logo2) : null,
        ];
    }

    private function mapDefaultSeo(?array $defaultSeo): ?array
    {
        if (!$defaultSeo) {
            return null;
        }

        return [
            'id' => $defaultSeo['id'] ?? null,
            'metaTitle' => $defaultSeo['metaTitle'] ?? null,
            'metaDescription' => $defaultSeo['metaDescription'] ?? null,
            'shareImage' => !empty($defaultSeo['shareImage']) ? new FileResource($defaultSeo['shareImage']) : null,
        ];
    }
}
