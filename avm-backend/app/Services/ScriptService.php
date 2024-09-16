<?php
namespace App\Services;
use Illuminate\Support\Facades\Process;
class ScriptService
{
    public function calculeValoration($data){
        \Log::error($data);
        // TODO
        // Run script swift to scrapping data

        $result = Process::run("swift run ScrappingSwift /home/mauri/Working/swift/ScrappingSwift");
        return $result->output();
    }
}
