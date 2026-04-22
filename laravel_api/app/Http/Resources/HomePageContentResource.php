<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomePageContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentId' => $this->document_id,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
            'publishedAt' => $this->published_at?->toIso8601String(),
            'partner' => $this->mapPartner($this->partner()),
            'service' => $this->mapService($this->service()),
            'aboutus' => $this->mapAboutUs($this->aboutus()),
            'news' => $this->mapNews($this->news()),
            'company_achievement' => $this->mapCompanyAchievement($this->companyAchievement()),
        ];
    }

    private function mapPartner(?array $partner): ?array
    {
        if ($partner === null) {
            return null;
        }

        return [
            'id' => $partner['id'] ?? null,
            'title' => $partner['title'] ?? null,
            'description' => $partner['description'] ?? null,
        ];
    }

    private function mapService(?array $service): ?array
    {
        if ($service === null) {
            return null;
        }

        return [
            'id' => $service['id'] ?? null,
            'title' => $service['title'] ?? null,
            'description' => $service['description'] ?? null,
            'button_link' => $service['button_link'] ?? null,
            'button_name' => $service['button_name'] ?? null,
        ];
    }

    private function mapAboutUs(?array $aboutUs): ?array
    {
        if ($aboutUs === null) {
            return null;
        }

        return [
            'id' => $aboutUs['id'] ?? null,
            'title' => $aboutUs['title'] ?? null,
            'description' => $aboutUs['description'] ?? null,
            'button_link' => $aboutUs['button_link'] ?? null,
            'button_name' => $aboutUs['button_name'] ?? null,
        ];
    }

    private function mapNews(?array $news): ?array
    {
        if ($news === null) {
            return null;
        }

        return [
            'id' => $news['id'] ?? null,
            'button_link' => $news['button_link'] ?? null,
            'button_name' => $news['button_name'] ?? null,
        ];
    }

    private function mapCompanyAchievement(?array $companyAchievement): ?array
    {
        if ($companyAchievement === null) {
            return null;
        }

        return [
            'id' => $companyAchievement['id'] ?? null,
            'title' => $companyAchievement['title'] ?? null,
            'description' => $companyAchievement['description'] ?? null,
        ];
    }
}
