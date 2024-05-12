<?php

namespace App\Http\Controllers;

use App\Helpers\validateRut;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private UserService $userService;
    private validateRut $validateRut;
    public function __construct(UserService $userService, validateRut $validateRut)
    {
        $this->validateRut = $validateRut;
        $this->userService = $userService;
    }

    public function getClients(){
        $res = $this->userService->clients();
        return response()->json($res);
    }

    public function searchClient(Request $request){
        $res = $this->userService->searchClient($request->rut);
        return response()->json($res);
    }

    public function registerClient(Request $request){
        $res = $this->userService->createClient($request);
        return response()->json($res);
    }

    public function registerAdminCoordinator(Request $request){
        $res =  $this->userService->createAdminCoordinator($request);
        return response()->json($res);
    }

    public function registerAdminSupervisor(Request $request){
        $res =  $this->userService->createAdminSupervisor($request);
        return response()->json($res);
    }

    public function updateClient(Request $request, $id){
        if($this->validateRut->validatorRut($request->rut)){
            return response()->json(['success' => false, 'message' => 'Rut incorrecto']);
        }
        $res =  $this->userService->updateClient($request, $id);
        return response()->json($res);
    }

    public function updateAdminCoordinator(Request $request, $id){
        $res =  $this->userService->updateAdminCoordinator($request, $id);
        return response()->json($res);
    }

    public function updateSupervisor(Request $request, $id){
        $res = $this->userService->updateAdminSupervisor($request, $id);
        return response()->json($res);
    }

    public function deleteClient($id){
        $res = $this->userService->deleteClient($id);
        return response()->json($res);
    }

    public function deleteCoordinator($id){
        $res = $this->userService->deleteCoordinator($id);
        return response()->json($res);
    }

    public function deleteSupervisor($id){
        $res = $this->userService->deleteSupervisor($id);
        return response()->json($res);
    }
}
