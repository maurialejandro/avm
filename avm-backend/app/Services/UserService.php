<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function clients(){
        try {
            $clients = User::where('user_types_id', 3)->get();
            return ['success' => true, 'clients' => $clients];
        } catch(\Throwable $th){
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al obtener clientes'];
        }
    }

    public function searchClient($rut){
        try {
            $client = User::where('rut', $rut)->get();
            return ['success' => true, 'client' => $client];
        } catch (\Throwable $th) {
            return ['success' => false, 'message' => 'Error al buscar cliente'];
        }
    }

    public function createClient($request){
        try {
            $createClient = New User();
            $createClient->user_types_id = 3;
            $createClient->name = $request->name;
            $createClient->email = $request->email;
            $createClient->rut = $request->rut;
            $createClient->phone  = $request->phone;
            $createClient->save();
            return ['success' => true, 'client' => 'Usuario creado satisfactoriamente'];
        } catch (\Throwable $th){
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al crear cliente'];
        }
    }

    public function createAdminCoordinator($request){
        try {
            $createAdminCoordinator = New User();
            $createAdminCoordinator->user_types_id = 1;
            $createAdminCoordinator->name = $request->name;
            $createAdminCoordinator->email = $request->email;
            $createAdminCoordinator->phone = $request->phone;
            $createAdminCoordinator->password = $request->password;
            $createAdminCoordinator->save();
            return ['success' => true, 'message' => 'Usuario creado satisfactoriamente'];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al crear usuario'];
        }
    }

    public function createAdminSupervisor($request){
        try {
            $createAdminSupervisor = New User();
            $createAdminSupervisor->user_types_id = 2;
            $createAdminSupervisor->name = $request->name;
            $createAdminSupervisor->email = $request->email;
            $createAdminSupervisor->phone = $request->phone;
            $createAdminSupervisor->password = $request->password;
        } catch (\Throwable $th){
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al crear usuario'];
        }
    }

    public function updateClient($request, $id){
        try {
            $clientToUpdate = User::where('id', $id)->first();
            $clientToUpdate->user_types_id = 3;
            $clientToUpdate->name = $request->name;
            $clientToUpdate->email = $request->email;
            $clientToUpdate->rut = $request->rut;
            $clientToUpdate->phone = $request->phone;
            $clientToUpdate->save();
            return ['success' => true, 'client' => 'Usuario actualizado satisfactoriamente'];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al actualizar cliente'];
        }
    }

    public function updateAdminCoordinator($request, $id){
        try {
            $adminToUpdate = User::where('id', $id)->first();
            $adminToUpdate->user_types_id = 1;
            $adminToUpdate->name = $request->name;
            $adminToUpdate->email = $request->email;
            $adminToUpdate->phone  = $request->phone;
            $adminToUpdate->password = Hash::make($request->password);
            $adminToUpdate->save();
            return ['success' => true, 'message' => 'Usuario actualizado satisfactoriamente'];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al actualizar usuario'];
        }
    }

    public function updateAdminSupervisor($request, $id){
        try {
            $adminToUpdate = User::where('id', $id)->first();
            $adminToUpdate->user_types_id = 2;
            $adminToUpdate->name = $request->name;
            $adminToUpdate->email = $request->email;
            $adminToUpdate->phone = $request->phone;
            $adminToUpdate->password = Hash::make($request->password);
            $adminToUpdate->save();
            return ['success' => true, 'message' => 'Usuario actualizado satisfactoriamente'];
        } catch (\Throwable $th){
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al actualizar usuario'];
        }
    }

    public function deleteCoordinator($id){
        try {
            $coordinatorToDelete = User::where('id', $id)->first();
            $coordinatorToDelete->delete();
            return ['success' => true, 'message' => 'Usuario eliminado satisfactoriamente'];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al eliminar usuario'];
        }
    }

    public function deleteSupervisor($id){
        try {
            $supervisorToDelete = User::where('id', $id)->first();
            $supervisorToDelete->delete();
            return ['success' => true, 'message' => 'Usuario eliminado satisfactoriamente'];
        } catch (\Throwable $th){
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al eliminar usuario'];
        }
    }

    public function deleteClient($id){
        try {
            $clientToDelete = User::where('id', $id)->first();
            $clientToDelete->delete();
            return ['success' => true, 'message' => 'Usuario eliminado satisfactoriamente'];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return ['success' => false, 'message' => 'Error al eliminar usuario'];
        }
    }
}
