<?php
namespace App\Services;
use App\Models\Appreciation;
use App\Models\File;

class FileService
{
    public function storeFile($request){
        try {
            $appreciation = Appreciation::where('id', $request->id)->first();

            $path = $request->file('file')->store($appreciation->users_id, 'files');
            $file = new File;
            $file->users_id = $appreciation->users_id;
            $file->appreciation_id = $request->id;
            $file->file_type_id = 1;
            $file->path = $path;
            $file->save();
            return [
                'success' => true,
                'message' => 'Archivo guardado satisfactoriamente'
            ];
        } catch (\Throwable $th){
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'message' => 'Error guardando archivo'
            ];
        }
    }
}
