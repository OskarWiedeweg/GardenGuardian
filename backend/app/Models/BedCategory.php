<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BedCategory extends Model
{
    public function garden(): BelongsTo
    {
        return $this->belongsTo(Garden::class);
    }

    public function beds(): BelongsToMany
    {
        return $this->belongsToMany(Bed::class);
    }
}
