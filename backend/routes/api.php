<?php

use App\Http\Controllers\GardenController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::prefix("/auth")->name("auth.")->group(function () {
    Route::post("/login", LoginController::class)->name("login");
    Route::post("/register", RegisterController::class)->name("register");
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix("/garden")->name("garden.")->group(function () {
        Route::apiResource("/", GardenController::class);
        Route::prefix("/{garden}")->group(function () {
            Route::apiResource("/beds", \App\Http\Controllers\BedController::class);
        });
    });

    Route::get("/user", function () {
       return new UserResource(auth()->user());
    });
});
