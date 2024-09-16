<?php

namespace App\Jobs;

use App\Services\ScriptService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateAppreciation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $clientData;
    private ScriptService $scriptService;
    public function __construct($clientData)
    {
        $this->clientData = $clientData;
        $this->scriptService = new ScriptService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->scriptService->calculeValoration($this->clientData);
    }
}
