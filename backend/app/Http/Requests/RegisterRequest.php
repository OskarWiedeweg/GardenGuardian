<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "email" => ["required", "email", "unique:users"],
            "name" => ["required", "string", "min:3", "max:255"],
            "password" => ["required", "string", "min:8"],
            "device_id" => ["required", "string"],
        ];
    }
}
