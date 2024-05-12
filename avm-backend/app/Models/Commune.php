<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Commune extends Model
{
    use HasFactory;

    public function region(): HasOne
    {
        return $this->hasOne(Region::class, 'id', 'regions_id');
    }
}
