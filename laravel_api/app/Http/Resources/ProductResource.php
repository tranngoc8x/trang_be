<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $image = $this->firstMediaByField('image');
        $avatar = $this->firstMediaByField('avatar');

        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'showInHome' => $this->show_in_home,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'locale' => $this->locale,

            'image' => $image ? new FileResource($image) : null,
            'avatar' => $avatar ? new FileResource($avatar) : null,
            'services' => ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
