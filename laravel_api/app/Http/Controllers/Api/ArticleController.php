<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Article::query()->published();

        $slugFilter = $request->input('filters.slug');
        $slug = is_array($slugFilter) ? ($slugFilter['$eq'] ?? null) : null;
        if (!empty($slug)) {
            $query->where('slug', $slug);
        }

        $perPage = max(1, (int) $request->input('pagination.pageSize', 25));
        $items = $query
            ->orderByDesc('id')
            ->paginate($perPage);
        $collection = $items->getCollection();

        Article::preloadMediaForCollection($collection, ['cover']);

        return response()->json([
            'data' => ArticleResource::collection($collection),
            'meta' => [
                'pagination' => [
                    'page' => $items->currentPage(),
                    'pageSize' => $items->perPage(),
                    'pageCount' => $items->lastPage(),
                    'total' => $items->total(),
                ],
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $item = Article::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        Article::preloadMediaForCollection(collect([$item]), ['cover']);

        return response()->json([
            'data' => new ArticleResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
