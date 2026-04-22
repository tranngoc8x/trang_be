<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $image = $this->firstMediaByField('image');

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'showInHome' => $this->show_in_home,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,

            'image' => $image ? new FileResource($image) : null,
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
