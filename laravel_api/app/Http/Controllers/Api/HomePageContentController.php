<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HomePageContentResource;
use App\Models\HomePageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomePageContentController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $locale = (string) $request->query('locale', '');

        $query = HomePageContent::query()->published();

        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $item = $query
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->first();

        if (!$item && $locale !== '') {
            $item = HomePageContent::query()
                ->published()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->first();
        }

        return response()->json([
            'data' => $item ? new HomePageContentResource($item) : null,
            'meta' => new \stdClass(),
        ]);
    }
}
