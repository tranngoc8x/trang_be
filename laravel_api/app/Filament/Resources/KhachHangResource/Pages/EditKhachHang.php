<?php

namespace App\Filament\Resources\KhachHangResource\Pages;

use App\Filament\Resources\KhachHangResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKhachHang extends EditRecord
{
    protected static string $resource = KhachHangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
