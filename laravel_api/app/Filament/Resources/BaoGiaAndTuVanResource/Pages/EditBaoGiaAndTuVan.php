<?php

namespace App\Filament\Resources\BaoGiaAndTuVanResource\Pages;

use App\Filament\Resources\BaoGiaAndTuVanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBaoGiaAndTuVan extends EditRecord
{
    protected static string $resource = BaoGiaAndTuVanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
