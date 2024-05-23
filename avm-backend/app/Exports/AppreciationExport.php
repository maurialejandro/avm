<?php

namespace App\Exports;

use Illuminate\View\View;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\FromView;

class AppreciationExport implements WithTitle, FromView
{

    public function __construct($appreciation){
        $this->appreciation = $appreciation;
    }

    public function view(): View
    {
        return view('mail.excel', [
            'details' => $this->appreciation,
        ]);
    }

    public function title(): string
    {
        return 'Informe de Estimacion de Valor';
    }
}
