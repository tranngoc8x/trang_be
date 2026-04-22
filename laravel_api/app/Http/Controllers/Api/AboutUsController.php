<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutUsResource;
use App\Models\AboutUs;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AboutUs::query()->published();
        $locale = (string) $request->query('locale', '');

        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $pageSize = min(100, max(1, (int) $request->input('pagination.pageSize', 25)));
        $page = max(1, (int) $request->input('pagination.page', 1));

        $items = $query
            ->orderBy('order')
            ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'page', $page);

        return response()->json([
            'data' => AboutUsResource::collection($items->getCollection()),
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

    public function show(string $id): JsonResponse
    {
        $item = AboutUs::query()
            ->published()
            ->whereKey($id)
            ->firstOrFail();

        return response()->json([
            'data' => new AboutUsResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
