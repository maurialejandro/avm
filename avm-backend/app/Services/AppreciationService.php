<?php
namespace App\Services;

use App\Mail\OrderShipped;
use App\Models\Appreciation;
use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AppreciationExport;
use App\Services\AccessCodeService;
use App\Services\ApiService;
use App\Services\CalculateService;
use App\Services\MailService;

class AppreciationService
{
    private AccessCodeService $accessCodeService;
    private ApiService $apiService;
    private CalculateService $calculateService;
    private MailService $mailService;

    public function __construct(
        AccessCodeService $accessCodeService, 
        ApiService $apiService,  
        CalculateService $calculateService,
        MailService $mailService
    )
    {
        $this->accessCodeService = $accessCodeService;
        $this->apiService = $apiService;
        $this->calculateService = $calculateService;
        $this->mailService = $mailService;
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
            $uf = $this->apiService->getUf(); // get uf
            $value_uf_valoranet = $this->calculateService->calculateValueValoranet($request);
            $value_uf_report = $this->calculateService->calculateValueWitnesses($request);
            $appreciation->value_uf_saved = $uf;
            $appreciation->value_uf_reference = $uf;
            $appreciation->value_uf_valoranet =  $value_uf_valoranet;
            $appreciation->value_uf_report =  $value_uf_report;
            $appreciation->quality = 10;
            $appreciation->save();
            $path = $client->id.'/appreciation'.$appreciation->id.'.xlsx';
            //$excel = Excel::store(new AppreciationExport($appreciation), $path, 'files');
            $this->mailService->sendExcelCoordinator($appreciation->id);
            $file = new File;
            $file->appreciation_id = $appreciation->id;
            $file->users_id = $client->id;
            $file->file_type_id = 1;
            $file->path = $path;
            $file->save();
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
