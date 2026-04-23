<?php

namespace App\Filament\Resources\BaoGiaAndTuVanResource\Pages;

use App\Filament\Resources\BaoGiaAndTuVanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBaoGiaAndTuVans extends ListRecords
{
    protected static string $resource = BaoGiaAndTuVanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
