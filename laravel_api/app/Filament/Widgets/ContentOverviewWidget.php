<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\BaoGiaAndTuVan;
use App\Models\Product;
use App\Models\Service;
use App\Models\StaticPage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class ContentOverviewWidget extends BaseWidget
{
    protected static bool $isLazy = false;

    protected function getStats(): array
    {
        return [
            Stat::make('Static Pages', (string) $this->countFor(StaticPage::class)),
            Stat::make('Products', (string) $this->countFor(Product::class)),
            Stat::make('Services', (string) $this->countFor(Service::class)),
            Stat::make('Articles', (string) $this->countFor(Article::class)),
            Stat::make('Leads', (string) $this->countFor(BaoGiaAndTuVan::class)),
        ];
    }

    /**
     * @param  class-string<Model>  $modelClass
     */
    protected function countFor(string $modelClass): int
    {
        $model = new $modelClass();
        $table = $model->getTable();

        if (! Schema::hasTable($table)) {
            return 0;
        }

        return $modelClass::query()->count();
    }
}
