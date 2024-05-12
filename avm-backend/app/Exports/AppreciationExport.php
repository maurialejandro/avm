<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class AppreciationExport implements FromCollection
{
    public function __construct($appreciation){
        $this->appreciation = $appreciation;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->appreciation;
    }
}
