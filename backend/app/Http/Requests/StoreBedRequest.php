<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBedRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "min:3", "max:255"],
            "size" => ["required", "string"]
        ];
    }
}
