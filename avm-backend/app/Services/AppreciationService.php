<?php
namespace App\Services;

use App\Mail\OrderShipped;
use App\Models\Appreciation;
use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AppreciationExport;

class AppreciationService
{

    private AccessCodeService $accessCodeService;

    public function __construct( AccessCodeService $accessCodeService )
    {
        $this->accessCodeService = $accessCodeService;
    }

    public function appreciations(){
        try {
            $appreciations = Appreciation::with('file')->get();
            return [ 'success' => true, 'appreciations' => $appreciations];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [ 'success' => false,  'error' => 'Error al obtener valoraciones' ];
        }
    }

    public function getAppreciationByClient($request){
        try {
            $appreciationsByClient = Appreciation::where('users_id', $request->user()->id)
                ->with('file')
                ->get();
            return [ 'success' => true, 'appreciations' => $appreciationsByClient ];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [ 'success' => false,  'error' => 'Error al obtener valoraciones de cliente' ];
        }
    }

    public function createAppreciation($request){
        try {
            if($request->data['newClient'] === true) {
                $client = new User();
                $client->name = $request->data['name'];
                $client->rut = $request->data['rut'];
                $client->user_types_id = 3;
                $client->email = $request->data['email'];
                $client->phone = $request->data['phone'];
                $client->save();
            } else {
                $client = User::where('rut', $request->data['rut'])->first();
            }
            $this->accessCodeService->createAccessCode($client->id);
            $appreciation = new Appreciation();
            $appreciation->users_id = $client->id;
            $appreciation->type_assets_id = $request->data['typeOfAsset'];
            $appreciation->access_code_id = 1;
            $appreciation->commune_id = $request->data['communeId'];
            $appreciation->address = $request->data['addressMap'];
            $appreciation->address_number = 123;
            $appreciation->rol = $request->data['rolBlock'].'-'.$request->data['rolPlotOfLand'];
            $appreciation->terrain_area =$request->data['terrainArea'];
            $appreciation->construction_area = $request->data['terrainConstruction'];
            $appreciation->bedrooms = $request->data['bedroom'];
            $appreciation->bathrooms = $request->data['bathroom'];
            $appreciation->latitude = $request->data['latitude'];
            $appreciation->longitude = $request->data['longitude'];
            $appreciation->status = true;
            $appreciation->value_uf_saved = 4564565;
            $appreciation->value_uf_reference = 3216549555;
            $appreciation->value_uf_valoranet = 123456789;
            $appreciation->value_uf_report = 123546123;
            $appreciation->quality = 10;
            $appreciation->save();
            $path = $client->id.'/appreciation'.$appreciation->id.'.xlsx';
            $excel = Excel::store(new AppreciationExport($appreciation), $path, 'files');
            $file = new File;
            $file->appreciation_id = $appreciation->id;
            $file->users_id = $client->id;
            $file->file_type_id = 1;
            $file->path = $path;
            $file->save();
            Mail::to('mauricio.acuna@valuaciones.cl')->send(new OrderShipped($appreciation, $path));
            return [
                'success' => true,
                'message' => 'El sistema esta procesando la valoracion'
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
