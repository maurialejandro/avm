<?php

namespace App\Services;

use App\Models\Commune;

class CommuneService
{
    public function searchCommunes($search){
        try {
            $commune = Commune::where('name', $search)
                ->with('region')
                ->first();
            return [
                'success' => true,
                'data' => $commune
            ];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'message' => 'Error al buscar comuna'
            ];
        }
    }
}
