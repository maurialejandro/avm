<?php

namespace App\Http\Controllers;

use App\Helpers\validateRut;
use App\Http\Requests\LoginAdminPostRequest;
use App\Http\Requests\LoginClientPostRequest;
use App\Models\UserType;
use App\Services\AuthService;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    private AuthService $authService;
    private validateRut  $validateRut;

    public function __construct(AuthService $authService, validateRut $validateRut)
    {
        $this->authService = $authService;
        $this->validateRut = $validateRut;
    }

    public function loginAdmin(LoginAdminPostRequest $request){
        $credentials = $request->only('email', 'password');
        if($this->authService->loginAdmin($credentials)){
            $key = 'test666';
            $type = UserType::where('id', $request->user()->user_types_id)->first();
            $token = $request->user()->createToken($credentials['email'])->plainTextToken;
            $payload = [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'type' => $type['name'],
                'sanctumToken' => $token,
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            $data = ['success' => true, 'access_token' => $jwt];
        } else {
            $data = ['success' => false, 'message' => 'bad credentials'];
        }
        return response()->json($data);
    }

    public function loginAdminPostman(LoginAdminPostRequest $request){
        if($this->authService->loginAdmin($request->only('email', 'password'))){
            $token = $request->user()->createToken($request->email)->plainTextToken;
            $data = ['success' => true, 'access_token' => $token];
        } else {
            $data = ['success' => false, 'message' => 'bad credentials'];
        }
        return response()->json($data);
    }

    public function loginClient(LoginClientPostRequest $request){
        if($this->validateRut->validatorRut($request->rut)){
            return response()->json(['success' => false, 'message' => 'Rut incorrecto']);
        }
        $credentials = $request->only('rut', 'accessCode');
        $res = $this->authService->loginClient($credentials);
        return response()->json($res);
    }

    public function logout(){
        $res = $this->authService->logout();
        return response()->json($res);
    }
}
