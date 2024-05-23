<?php

namespace App\Services;

use App\Models\Appreciation;
use Illuminate\Support\Facades\DB;

class MailService
{
    public function sendExcelCoordinator($id){
        try{
            $appreciation = Appreciation::where('id', $id)
                ->with('client')
                ->with('commune.region')
                ->first();
            $date = $appreciation['updated_at']->format('d-m-Y');
            // calculate pesos
            $value_uf = explode('.', $appreciation['value_uf_report']);
            $value_pesos = explode('.', ($appreciation['value_uf_saved'] * $appreciation['value_uf_report']));
            $full_address = $appreciation['address'] . ' ' . $appreciation['address_number'];

            // Calculate +- 15% for final range
            $rango_min_p_temp = $value_pesos[0] * 0.85;
            $rango_max_p_temp = $value_pesos[0] * 1.15;

            $rango_min_p = round($rango_min_p_temp);
            $rango_max_p = round($rango_max_p_temp);

            $rango_min_uf_temp = $value_uf[0] * 0.85;
            $rango_max_uf_temp = $value_uf[0] * 1.15;

            $rango_min_uf = round($rango_min_uf_temp);
            $rango_max_uf = round($rango_max_uf_temp);
            
            list($rol_izq, $rol_der) = explode('-', $appreciation['rol']);
            
            $stored_sii = DB::connection('valoranet')
             ->select(DB::raw('CALL valorane_SII_1SEM_2022.sp_lista_sii(?,?,?,?)'), array($appreciation->commune[0]->code_commune, $rol_izq, $rol_der, $full_address));
            \Log::error($stored_sii);
            //Mail::to('mauricio.acuna@valuaciones.cl')->send(new OrderShipped($appreciation, $path));
            return true;
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'error' => 'Error al enviar correo con valoracion'
            ];
        }
    }

    public function sendInfoClient(){
        try{
            return true;
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'error' => 'Error al enviar correo con valoracion'
            ];
        }
    }
}
