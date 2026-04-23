<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Product::query()->published()->with('services');

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

            Product::preloadMediaForCollection($collection, ['image', 'avatar']);

            $services = $collection->pluck('services')->flatten()->unique('id')->values();
            if ($services->isNotEmpty()) {
                Service::preloadMediaForCollection($services, ['image']);
            }

            return response()->json([
                'data' => ProductResource::collection($collection),
                'meta' => [
                    'pagination' => [
                        'page' => $items->currentPage(),
                        'pageSize' => $items->perPage(),
                        'pageCount' => $items->lastPage(),
                        'total' => $items->total(),
                    ],
                ],
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            if (str_contains($e->getMessage(), 'Base table or view not found')) {
                return response()->json([
                    'data' => [],
                    'meta' => [
                        'pagination' => [
                            'page' => 1,
                            'pageSize' => 25,
                            'pageCount' => 0,
                            'total' => 0,
                        ],
                    ],
                ]);
            }
            throw $e;
        }
    }

    public function show(string $slug): JsonResponse
    {
        $item = Product::query()
            ->published()
            ->with('services')
            ->where('slug', $slug)
            ->firstOrFail();

        Product::preloadMediaForCollection(collect([$item]), ['image', 'avatar']);

        if ($item->services->isNotEmpty()) {
            Service::preloadMediaForCollection($item->services, ['image']);
        }

        return response()->json([
            'data' => new ProductResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
