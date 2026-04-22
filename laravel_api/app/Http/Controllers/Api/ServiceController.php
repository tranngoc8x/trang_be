<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()->published()->with('products');

        $slugFilter = $request->input('filters.slug');
        $slug = is_array($slugFilter) ? ($slugFilter['$eq'] ?? null) : null;
        if (!empty($slug)) {
            $query->where('slug', $slug);
        }

        if ($request->boolean('showInHome')) {
            $query->showInHome();
        }

        $perPage = max(1, (int) $request->input('pagination.pageSize', 25));
        $items = $query->orderByDesc('id')->paginate($perPage);
        $collection = $items->getCollection();

        Service::preloadMediaForCollection($collection, ['image']);

        $products = $collection->pluck('products')->flatten()->unique('id')->values();
        if ($products->isNotEmpty()) {
            Product::preloadMediaForCollection($products, ['image', 'avatar']);
        }

        return response()->json([
            'data' => ServiceResource::collection($collection),
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
        $item = Service::query()
            ->published()
            ->with('products')
            ->where('slug', $slug)
            ->firstOrFail();

        Service::preloadMediaForCollection(collect([$item]), ['image']);

        if ($item->products->isNotEmpty()) {
            Product::preloadMediaForCollection($item->products, ['image', 'avatar']);
        }

        return response()->json([
            'data' => new ServiceResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
