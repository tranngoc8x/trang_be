<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GlobalResource;
use App\Models\GlobalSetting;
use Illuminate\Http\JsonResponse;

class GlobalController extends Controller
{
    public function show(): JsonResponse
    {
        $item = GlobalSetting::current();

        if (!$item) {
            return response()->json([
                'data' => null,
                'meta' => new \stdClass(),
            ]);
        }

        GlobalSetting::preloadMediaForCollection(collect([$item]), ['favicon', 'logo', 'logo2']);

        return response()->json([
            'data' => new GlobalResource($item),
            'meta' => new \stdClass(),
        ]);
    }
}
