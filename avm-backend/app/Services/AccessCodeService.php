<?php

namespace App\Services;

use App\Models\AccessCode;
use Illuminate\Support\Facades\Hash;

class AccessCodeService
{

    function random_string($length){
        $str_result = '1234567890ABCDFGHIJKLMNOPKRSTUVWXZYabcdefghijklmnopqrstuvwxzy';
        return substr(str_shuffle($str_result),0,$length);
    }
    public function createAccessCode($userId){
        try {
            $random = $this->random_string(6);
            $accessCode = new AccessCode();
            $accessCode->users_id = $userId;
            $accessCode->code = Hash::make($random);
            $accessCode->save();
        } catch(\Throwable $th){
            \Log::error($th->getMessage());
            return [
                'success' => false,
                'message' => 'Error al crear Access Code'
            ];
        }
    }
}
