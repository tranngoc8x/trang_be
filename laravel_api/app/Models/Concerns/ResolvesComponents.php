<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\DB;

trait ResolvesComponents
{
    protected function componentLinkTable(): string
    {
        return $this->getTable().'_cmps';
    }

    protected function resolveComponentLink(string $field, ?string $componentType = null): ?object
    {
        $entityKey = $this->getKey();

        if (!$this->exists || $entityKey === null) {
            return null;
        }

        $query = DB::table($this->componentLinkTable())
            ->where('entity_id', $entityKey)
            ->where('field', $field)
            ->orderBy('order');

        if ($componentType !== null) {
            $query->where('component_type', $componentType);
        }

        return $query->first();
    }

    protected function resolveComponentRecord(string $field, string $componentType, string $componentTable): ?object
    {
        $link = $this->resolveComponentLink($field, $componentType);

        if (!$link) {
            return null;
        }

        $componentId = $link->component_id ?? $link->cmp_id ?? null;

        if ($componentId === null) {
            return null;
        }

        return DB::table($componentTable)
            ->where('id', $componentId)
            ->first();
    }
}
