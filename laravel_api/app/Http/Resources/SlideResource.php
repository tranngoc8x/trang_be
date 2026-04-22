<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlideResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $image = $this->firstMediaByField('image');

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'content' => $this->content,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,
            'position' => $this->position ?? [],
            'image' => $image ? new FileResource($image) : null,
        ];
    }
}
