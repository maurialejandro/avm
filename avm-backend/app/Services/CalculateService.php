<?php

namespace App\Services;
use App\Services\DBService;

/**
 * In the calculate services, there are function 
 * to calculate data from APIS or DBs
 */

class CalculateService
{
    
    private DBService $dbService;

    public function __construct(DBService $dbService)
    {
        $this->dbService = $dbService;
    }

    public function calculateValueValoranet($request){
        $currentDate = now('America/santiago')->format('d-m-Y');
        $currentDateValo = now('America/santiago')->format('Y-m-d');
        $getYear = substr($currentDateValo, 0, 4);
        $getRestDate = substr($currentDateValo, 4);
        $getYear -= 1;
        $dateYearsLess = $getYear . $getRestDate;
        $latitude = $request->data['latitude'];
        $longitude = $request->data['longitude'];
         // set type of asset
         if ($request->data['typeOfAsset'] == 1) {
            $typeAsset = 'CASA';
            $typeAsset2 = 'VIVIENDA_UNIFAMILIAR';
        } else if ($request->data['typeOfAsset'] == 2) {
            $typeAsset = 'DEPARTAMENTO';
            $typeAsset2 = 'DEPARTAMENTO';
        }

        // get the +-15% of variation in construction area
        $baseArea = $request->data['terrainConstruction'];
        $variationArea = 0.3 * $baseArea;
        $upperArea = $baseArea + $variationArea;
        $lowerArea = $baseArea - $variationArea;

        // set some helpers
        $distanceValoranet = 1;
        $queryReferences = [];
        $promedioValoranet = 0;
        $qualityValoranet = 7.5;
        $statusValueValoranet = 1;

        do {
            $queryReferences = $this->dbService->getValueValoranet($latitude, $longitude, $distanceValoranet, $dateYearsLess, $currentDateValo, $typeAsset, $typeAsset2, (float)$lowerArea, (float)$upperArea);
            $distanceValoranet += 0.5;
            $qualityValoranet -= 0.5;
            if ($qualityValoranet <= 1) {
                $statusValueValoranet = 0;
            }
        } while ($statusValueValoranet != 0 && count($queryReferences) <= 10 && $distanceValoranet < 8);
        $i = 1;

        foreach ($queryReferences as $row) {
            $promedioValoranet += (int)$row->VALOR_COMERCIAL_ENCARGO_SUPERVISADO_UF;
            $i += 1;
        };
        if ($i == 1) {
            $i = 2;
        }

        $value_uf_valoranet = $promedioValoranet / ($i - 1);
        return $value_uf_valoranet;
    }

    public function calculateValueWitnesses($request){
        $currentDate = now('America/santiago')->format('d-m-Y');
        $currentDateValo = now('America/santiago')->format('Y-m-d');
        $getYear = substr($currentDateValo, 0, 4);
        $getRestDate = substr($currentDateValo, 4);
        $getYear -= 1;
        $dateYearsLess = $getYear . $getRestDate;
        $latitude = $request->data['latitude'];
        $longitude = $request->data['longitude'];
        $distanceWitnesses = 0.5;
        $promedioWitnesses = 0;
        $qualityWitnesses = 7.5;
        $difAsset = 1;
        $statusValueWitnesses = 1;
        $baseArea = $request->data['terrainConstruction'];
        $variationArea = 0.3 * $baseArea;
        $upperArea = $baseArea + $variationArea;
        $lowerArea = $baseArea - $variationArea;
        do {
            $queryWitnesses = $this->dbService->getValueWitnesses($latitude, $longitude, $distanceWitnesses, $lowerArea, $upperArea, $difAsset, $dateYearsLess, $currentDateValo, $request);
            $distanceWitnesses += 0.3;
            $qualityWitnesses -= 1.0;
            if ($qualityWitnesses == 3) {
                $difAsset += 1; 
            }
            if ($qualityWitnesses <= 1) {
                $statusValueWitnesses = 0;
            }
        } while ($statusValueWitnesses != 0 && count($queryWitnesses) <= 10 && $distanceWitnesses <= 3);
        $j = 1;
        foreach ($queryWitnesses as $row) {
            $promedioWitnesses += $row->value_uf;
            $j += 1;
        };
        if ($j == 1) {
            $j = 2;
        }
        $value_uf_reference = 0;
        if (count($queryWitnesses) != 0) {
            $value_uf_reference = $promedioWitnesses / ($j - 1);
        } else {
            $qualityWitnesses = 1;
        }

        return true;
    }
}