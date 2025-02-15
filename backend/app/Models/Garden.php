<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Garden extends Model
{

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        if ($value == "my") {
            return self::query()->whereBelongsTo(auth()->user())->firstOrFail();
        }
        return parent::resolveRouteBinding($value, $field);
    }

}
