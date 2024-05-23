<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function loginAdmin($credential){
        return Auth::attempt($credential);
    }
    public function loginClient($credential){
        try {
            $userClient = User::where('rut', $credential['rut'])
                ->with('userType')
                ->with('accessCodes')
                ->first();
            if(Hash::check($credential['accessCode'], $userClient->accessCodes[0]->code)){
                $key = 'test666';
                $token = $userClient->createToken($userClient->rut)->plainTextToken;
                $payload = [
                    'name' => $userClient->name,
                    'email' => $userClient->email,
                    'type' => $userClient->userType[0]->name,
                    'sanctumToken' => $token,
                ];
                $jwt = JWT::encode($payload, $key, 'HS256');
                $data = [
                    'success' => true,
                    'access_token' => $jwt,
                ];
            } else {
                $data = [
                    'success' => false,
                    'message' => 'Error en las credenciales'
                ];
            }
            return $data;
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'message' => 'Error al iniciar sesion',
            ];
        }
    }
    public function logout(){
        try {
            auth()->user()->tokens()->delete();
            return [
                'success' => true,
                'message' => 'Logout exitosamente',
            ];
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'message' => 'Error al cerrar sesion',
            ];
        }
    }
}
