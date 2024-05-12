<?php

namespace App\Mail;

use App\Models\Appreciation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\SerializesModels;
use App\Exports\AppreciationExport;
use Symfony\Component\Mime\MimeTypes;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    public $appreciation;
    /**
     * Create a new message instance.
     */
    public function __construct($appreciation)
    {
        $this->appreciation = $appreciation;
    }

    public function build(): self 
    {
        return $this
            ->subject('Informe AVM para revisar en excel')
            ->view('mail.valoration')
            ->attach(public_path('storage/appreciation.xlsx'), [
                'as' => 'appreciation.xlsx',
                'mime' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }
}
