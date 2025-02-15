<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("/auth")->name("auth.")->group(function () {
    Route::post("/login", LoginController::class)->name("login");
    Route::post("/register", RegisterController::class)->name("register");
});

Route::middleware('auth:sanctum')->group(function () {
   Route::get("/user", function () {
       return new UserResource(auth()->user());
   });
});
