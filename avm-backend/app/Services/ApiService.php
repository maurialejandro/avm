<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ApiService 
{    
    public function getUf(){
        $currentDate = now('America/santiago')->format('d-m-Y');
        $currentDateValo = now('America/santiago')->format('Y-m-d');
        $ufApi = Http::get("https://mindicador.cl/api/uf/" . $currentDate);
        if ($ufApi->failed()) {
            $query = DB::connection('valoranet')->table('UF')->select('VALOR_UF')
                ->where('FECHA_UF', '=', $currentDateValo)->pluck('VALOR_UF')->first();
            $ufDay = $query;
        } else {
            $ufDayArray = $ufApi->json();
            $ufDay = $ufDayArray['serie'][0]['valor'];
        }
        return $ufDay;
    }
}