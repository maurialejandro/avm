<?php

namespace App\Http\Controllers;

use App\Services\CommuneService;
use Illuminate\Http\Request;

class CommuneController extends Controller
{
    private CommuneService $communeService;
    public function __construct(CommuneService $communeService)
    {
        $this->communeService = $communeService;
    }

    public function searchCommune(Request $request){

        $res = $this->communeService->searchCommunes($request->search);
        return response()->json($res);
    }
}
