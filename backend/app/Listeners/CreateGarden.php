<?php

namespace App\Listeners;

use App\Models\Garden;
use Illuminate\Auth\Events\Registered;

class CreateGarden
{
    public function handle(Registered $event): void
    {
        $garden = new Garden();
        $garden->user()->associate($event->user);
        $garden->save();
    }
}
