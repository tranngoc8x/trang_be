<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'files';

    protected $fillable = [
        'document_id',
        'name',
        'alternative_text',
        'caption',
        'width',
        'height',
        'formats',
        'hash',
        'ext',
        'mime',
        'size',
        'url',
        'preview_url',
        'provider',
        'provider_metadata',
        'folder_path',
        'published_at',
        'locale',
    ];

    protected $casts = [
        'formats' => 'array',
        'provider_metadata' => 'array',
        'width' => 'integer',
        'height' => 'integer',
        'size' => 'decimal:2',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Accessor: full URL
     */
    public function getFullUrlAttribute(): string
    {
        if (str_starts_with($this->url, 'http')) {
            return $this->url;
        }
        return config('app.url') . $this->url;
    }

    /**
     * Accessor: thumbnail URL
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        if (isset($this->formats['thumbnail']['url'])) {
            $url = $this->formats['thumbnail']['url'];
            if (str_starts_with($url, 'http')) {
                return $url;
            }
            return config('app.url') . $url;
        }
        return $this->full_url;
    }
}
