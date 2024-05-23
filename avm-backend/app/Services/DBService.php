<?php

namespace App\Services;
use App\Models\Witnesses;
use Illuminate\Support\Facades\DB;

/**
 * In the database services, there are function 
 * to obtain data from internal o external
 * databases to the AVM system
 */

class DBService 
{

    /** 
     * Query to database AVM witnesses table to get data for value
     * 
     * @param $latitude, $longitude, $lowerArea, $upperArea, $difAsset, $dateYearsLess, $currentDateValo, $request
     * @return $queryWitnesses object from sql
     */
    public function getValueWitnesses($latitude, $longitude, $distanceWitnesses, $lowerArea, $upperArea, $difAsset, $dateYearsLess, $currentDateValo, $request)
    {    
        if ($request->data['bathroom'] == 0 || $request->data['bedroom'] == 0) {
            $queryWitnesses = Witnesses::select('*', DB::RAW('
        (6371 * acos(cos(radians(' . $latitude . ')) * cos(radians(LATITUDE)) * cos(radians(LONGITUDE) 
        - radians(' . $longitude . ')) + sin(radians(' . $latitude . ')) * sin(radians(LATITUDE)))
        ) AS distancia'))
                ->where('id_type_of_assets', $request->data['typeOfAsset'])
                ->whereBetween('construction_area', [$lowerArea, $upperArea])
                ->whereBetween('publication_date', [$dateYearsLess, $currentDateValo])
                ->where('commune_id', $request->data['communeId'])
                ->having('distancia', '<', $distanceWitnesses)
                ->get();
        } else {
            $queryWitnesses = Witnesses::select('*', DB::RAW('
        (6371 * acos(cos(radians(' . $latitude . ')) * cos(radians(LATITUDE)) * cos(radians(LONGITUDE) 
        - radians(' . $longitude . ')) + sin(radians(' . $latitude . ')) * sin(radians(LATITUDE)))
        ) AS distancia'))
                ->where('type_asset_id', $request->data['typeOfAsset'])
                ->whereBetween('construction_area', [$lowerArea, $upperArea])
                ->whereBetween('bathrooms', [$request->data['bathroom'] - $difAsset, $request->data['bathroom'] + $difAsset])
                ->whereBetween('bedrooms', [$request->data['bedroom'] - $difAsset, $request->data['bedroom'] + $difAsset])
                ->whereBetween('publication_date', [$dateYearsLess, $currentDateValo])
                ->where('commune_id', $request->data['communeId'])
                ->having('distancia', '<', $distanceWitnesses)
                ->get();
        }
        return $queryWitnesses;
    }

     /** 
     * Query to database Valoranet to get appraisals data
     * 
     * @param $latitude, $longitude, $distance, $dateYearsLess, $currentDateValo, $typeAsset, $typeAsset2, $lowerArea, $upperArea
     * @return $queryReferences object from sql
     */
    public function getValueValoranet(
        $latitude,
        $longitude,
        $distanceValoranet,
        $dateYearsLess,
        $currentDateValo,
        $typeAsset,
        $typeAsset2,
        $lowerArea,
        $upperArea
    ) {
        $queryReferences = DB::connection('valoranet')
            ->table('ENCARGO')
            ->select('NUMERO_EXPEDIENTE', 'CALLE_BIEN', 'NUMERO_BIEN', 'COMUNA_BIEN', 'SUP_EDIFICADA', 'SUP_TERRENO', 'FECHA_DESPACHO', 'DESC_TIPO_BIEN', 'VALOR_COMERCIAL_ENCARGO_SUPERVISADO_UF', 'LATITUD', 'LONGITUD', DB::RAW('
            (6371 * acos(cos(radians(' . $latitude . ')) * cos(radians(LATITUD)) * cos(radians(LONGITUD) - radians(' . $longitude . ')) 
            + sin(radians(' . $latitude . ')) * sin(radians(LATITUD)))) AS distancia'))
            ->join('DATO_TECNICO_ENCARGO', 'DATO_TECNICO_ENCARGO.ID_ENCARGO', '=', 'ENCARGO.ID_ENCARGO')
            ->whereBetween('FECHA_DESPACHO', [$dateYearsLess, $currentDateValo])
            ->whereIn('DESC_TIPO_BIEN', [$typeAsset, $typeAsset2])
            ->where('SUP_EDIFICADA', '>', (int)$lowerArea)
            ->where('SUP_EDIFICADA', '<', (int)$upperArea)
            ->whereIn('DESC_FINALIDAD', ['CREDITO HIPOTECARIO', 'COMPRA VENTA'])
            ->having('distancia', '<', $distanceValoranet)
            ->orderBy('distancia')
            ->distinct('NUMERO_EXPEDIENTE')
            ->get();
        return $queryReferences;
    }
}