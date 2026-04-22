<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\KhachHangResource;
use App\Models\KhachHang;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KhachHangController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = KhachHang::query()->published();
        $locale = (string) $request->query('locale', '');

        if ($locale !== '') {
            $query->where('locale', $locale);
        }

        $pageSize = min(100, max(1, (int) $request->input('pagination.pageSize', 25)));
        $page = max(1, (int) $request->input('pagination.page', 1));

        $items = $query
            ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'page', $page);

        KhachHang::preloadMediaForCollection($items->getCollection(), ['logo']);

        return response()->json([
            'data' => KhachHangResource::collection($items->getCollection()),
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
        $item = KhachHang::query()
            ->published()
            ->whereKey($id)
            ->firstOrFail();

        KhachHang::preloadMediaForCollection(collect([$item]), ['logo']);

        return response()->json([
            'data' => new KhachHangResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
