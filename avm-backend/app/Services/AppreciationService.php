<?php
namespace App\Services;

use App\Mail\OrderShipped;
use App\Models\Appreciation;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AppreciationExport;

class AppreciationService
{
    public function appreciations(){
        try {
            $appreciations = Appreciation::all();
            return [ 'success' => true, 'appreciations' => $appreciations];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [ 'success' => false,  'error' => 'Error al obtener valoraciones' ];
        }
    }

    public function getAppreciationByClient($request){
        try {
            $appreciationsByClient = Appreciation::where('users_id', $request->user()->id)->get();
            return [ 'success' => true, 'appreciations' => $appreciationsByClient ];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [ 'success' => false,  'error' => 'Error al obtener valoraciones de cliente' ];
        }
    }

    public function createAppreciation($request){
        try {
            // agregar logica si el usario existe o si se acutaliza o crea
            $appreciation = new Appreciation();
            $appreciation->users_id = 2;
            $appreciation->type_assets_id = 1;
            $appreciation->access_code_id = 1;
            $appreciation->commune_id = 124;
            $appreciation->address = $request->data['addressMap'];
            $appreciation->address_number = 123;
            $appreciation->rol = $request->data['rolBlock'].'-'.$request->data['rolPlotOfLand'];
            $appreciation->terrain_area =$request->data['terrainArea'];
            $appreciation->construction_area = $request->data['terrainConstruction'];
            $appreciation->bedrooms = $request->data['bedroom'];
            $appreciation->bathrooms = $request->data['bathroom'];
            $appreciation->latitude = 45.55;
            $appreciation->longitude = 78.33;
            $appreciation->status = true;
            $appreciation->value_uf_saved = 4564565;
            $appreciation->value_uf_reference = 3216549555;
            $appreciation->value_uf_valoranet = 123456789;
            $appreciation->value_uf_report = 123546123;
            $appreciation->quality = 10;
            $appreciation->save();
            $appreciationGet = [
                'direccion' => $appreciation->address,
                'area_terreno' => $appreciation->terrain_area,
                'area_construction' => $appreciation->construction_area,
                'habitaciones' => $appreciation->bedrooms,
                'banos' => $appreciation->bathrooms,
                'valor_uf' => $appreciation->value_uf_saved
            ];
            $excel = Excel::store(new AppreciationExport($appreciation), 'appreciation.xlsx');
            Mail::to('mauricio.acuna@valuaciones.cl')->send(new OrderShipped($appreciation));
            return [
                'success' => true,
                'appreciation' => 'La el sistema esta procesando la valoracion'
            ];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'error' => 'Error al crear valoraciones de cliente'
            ];
        }
    }
}
