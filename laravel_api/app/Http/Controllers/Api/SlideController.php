<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SlideResource;
use App\Models\Slide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SlideController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Slide::query()->published();
        $locale = (string) $request->query('locale', '');

        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $pageSize = min(100, max(1, (int) $request->input('pagination.pageSize', 25)));
        $page = max(1, (int) $request->input('pagination.page', 1));

        $items = $query
            ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'page', $page);

        Slide::preloadMediaForCollection($items->getCollection(), ['image']);

        return response()->json([
            'data' => SlideResource::collection($items->getCollection()),
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
        $item = Slide::query()
            ->published()
            ->whereKey($id)
            ->firstOrFail();

        Slide::preloadMediaForCollection(collect([$item]), ['image']);

        return response()->json([
            'data' => new SlideResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
