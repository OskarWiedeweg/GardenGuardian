<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    public function __invoke(RegisterRequest $request): AuthResource
    {
        $user = new User();
        $user->fill($request->validated());
        $user->save();

        event(new Registered($user));

        $token = $user->createToken('token')->plainTextToken;

        return new AuthResource([
           "token" => $token,
           "user" => $user
        ]);
    }
}
