<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StaticPageResource;
use App\Models\StaticPage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StaticPageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = StaticPage::query()->published();

        $slugFilter = $request->input('filters.slug');
        $slug = is_array($slugFilter) ? ($slugFilter['$eq'] ?? null) : null;

        if (!empty($slug)) {
            $query->where('slug', $slug);
        }

        $pageSize = min(100, max(1, (int) $request->input('pagination.pageSize', 25)));
        $page = max(1, (int) $request->input('pagination.page', 1));

        $items = $query
            ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'page', $page);

        $total = $items->total();

        return response()->json([
            'data' => StaticPageResource::collection($items->getCollection()),
            'meta' => [
                'pagination' => [
                    'page' => $items->currentPage(),
                    'pageSize' => $items->perPage(),
                    'pageCount' => $total === 0 ? 0 : $items->lastPage(),
                    'total' => $total,
                ],
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $item = StaticPage::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => new StaticPageResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
