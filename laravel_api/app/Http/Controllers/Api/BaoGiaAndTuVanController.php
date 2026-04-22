<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BaoGiaAndTuVanResource;
use App\Models\BaoGiaAndTuVan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BaoGiaAndTuVanController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = max(1, (int) $request->input('pagination.pageSize', 25));
        $items = BaoGiaAndTuVan::query()
            ->whereNotNull('published_at')
            ->orderByDesc('id')
            ->paginate($perPage);

        return response()->json([
            'data' => BaoGiaAndTuVanResource::collection($items->getCollection()),
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

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), BaoGiaAndTuVan::rules());

        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'status' => 400,
                    'name' => 'ValidationError',
                    'message' => 'Validation failed',
                    'details' => $validator->errors(),
                ],
            ], 400);
        }

        $item = BaoGiaAndTuVan::query()->create([
            'customer_name' => $request->input('customer_name'),
            'customer_phone' => $request->input('customer_phone'),
            'content' => $request->input('content'),
            'published_at' => now(),
            'locale' => $request->input('locale', 'vi'),
        ]);

        return response()->json([
            'data' => [
                'id' => $item->id,
                'documentId' => $item->document_id,
                'createdAt' => $item->created_at?->toIso8601String(),
                'updatedAt' => $item->updated_at?->toIso8601String(),
                'publishedAt' => $item->published_at?->toIso8601String(),
            ],
            'meta' => new \stdClass(),
        ], 201);
    }
}
