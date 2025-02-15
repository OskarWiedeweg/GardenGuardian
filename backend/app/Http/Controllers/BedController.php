<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBedRequest;
use App\Http\Resources\BedResource;
use App\Models\Bed;
use App\Models\Garden;
use Illuminate\Http\Request;

class BedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Garden $garden): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $beds = Bed::query()->whereBelongsTo($garden)->latest()->paginate();
        return BedResource::collection($beds);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBedRequest $request, Garden $garden): BedResource
    {
        $bed = new Bed();
        $bed->fill($request->validated());
        $bed->garden()->associate($garden);
        $bed->save();

        return new BedResource($bed);
    }

    /**
     * Display the specified resource.
     */
    public function show(Garden $garden, Bed $bed): BedResource
    {
        return new BedResource($bed);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bed $beds)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bed $beds)
    {
        //
    }
}
