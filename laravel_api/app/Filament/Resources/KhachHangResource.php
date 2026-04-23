<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KhachHangResource\Pages;
use App\Models\KhachHang;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class KhachHangResource extends Resource
{
    protected static ?string $model = KhachHang::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('website')
                    ->maxLength(255),
                Forms\Components\Placeholder::make('logo_preview')
                    ->label('logo')
                    ->content(fn (?\App\Models\KhachHang $record): string => $record?->logo()?->url ?? 'No logo'),
                Forms\Components\DateTimePicker::make('published_at'),
                Forms\Components\TextInput::make('locale')
                    ->maxLength(20),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('website')
                    ->searchable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKhachHangs::route('/'),
            'create' => Pages\CreateKhachHang::route('/create'),
            'edit' => Pages\EditKhachHang::route('/{record}/edit'),
        ];
    }
}
