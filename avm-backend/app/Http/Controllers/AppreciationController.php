<?php

namespace App\Http\Controllers;

use App\Services\AppreciationService;
use Illuminate\Http\Request;

class AppreciationController extends Controller
{
    private AppreciationService $appreciationService;
    public function __construct(AppreciationService $appreciationService)
    {
        $this->appreciationService = $appreciationService;
    }

    public function getAppreciations(){
        $res = $this->appreciationService->appreciations();
        return response()->json($res);
    }

    public function getAppreciationByClient(Request $request){
        $res = $this->appreciationService->getAppreciationByClient($request);
        return response()->json($res);
    }

    public function createAppreciation(Request $request){
        $res = $this->appreciationService->createAppreciation($request);
        return response()->json($res);
    }
}
