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

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct($appreciation, $path)
    {
        $this->appreciation = $appreciation;
        $this->path = $path;
    }

    public function build(): self
    {
        return $this
            ->subject('Informe AVM para revisar en excel')
            ->view('mail.valoration')->with('details', $this->appreciation)
            ->attach('C:\Users\mauricio.acuna\Documents\Working\avm\avm-backend/storage/app/files/'.$this->path, [
                'as' => 'appreciation.xlsx',
                'mime' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]);
    }
}
