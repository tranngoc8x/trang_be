<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request, string $slug): JsonResponse
    {
        $query = Menu::query()
            ->published()
            ->where('slug', $slug);

        $locale = (string) $request->query('locale', '');
        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $pageSize = min(100, max(1, (int) $request->input('pagination.pageSize', 25)));
        $page = max(1, (int) $request->input('pagination.page', 1));

        $items = $query
            ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'page', $page);

        return response()->json([
            'data' => MenuResource::collection($items->getCollection()),
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

    public function show(Request $request, string $slug, string $id): JsonResponse
    {
        $query = Menu::query()
            ->published()
            ->where('slug', $slug)
            ->whereKey($id);

        $locale = (string) $request->query('locale', '');
        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $item = $query->firstOrFail();

        return response()->json([
            'data' => new MenuResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
