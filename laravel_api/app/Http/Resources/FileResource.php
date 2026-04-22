<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'name' => $this->name,
            'alternativeText' => $this->alternative_text,
            'caption' => $this->caption,
            'width' => $this->width,
            'height' => $this->height,
            'formats' => $this->formats,
            'hash' => $this->hash,
            'ext' => $this->ext,
            'mime' => $this->mime,
            'size' => $this->size,
            'url' => $this->url,
            'previewUrl' => $this->preview_url,
            'provider' => $this->provider,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
        ];
    }
}
