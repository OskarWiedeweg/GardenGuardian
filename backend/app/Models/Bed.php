<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bed extends Model
{
    protected $fillable = [
        "name",
        "size"
    ];

    public function garden(): BelongsTo
    {
        return $this->belongsTo(Garden::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(BedCategory::class);
    }
}
