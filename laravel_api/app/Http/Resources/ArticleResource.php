<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $cover = $this->firstMediaByField('cover');

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,

            'cover' => $cover ? new FileResource($cover) : null,
        ];
    }
}
