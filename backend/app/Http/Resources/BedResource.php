<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "categories" => $this->whenLoaded('categories', fn () => BedCategoryResource::collection($this->categories)),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }
}
