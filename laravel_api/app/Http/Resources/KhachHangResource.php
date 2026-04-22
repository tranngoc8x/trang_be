<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KhachHangResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $logo = $this->firstMediaByField('logo');

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'website' => $this->website,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,
            'logo' => $logo ? new FileResource($logo) : null,
        ];
    }
}
