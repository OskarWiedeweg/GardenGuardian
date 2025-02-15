import type {PageServerLoad, Actions} from "./$types";
import {api} from "$lib/api";
import {handleLoadError} from "$lib/api/error";

export const load: PageServerLoad = async (event) => {
    const response = await api(event)
        .garden()
        .handle()
        .bed()
        .get(event.params.id);

    if (response.type === "error") {
        throw handleLoadError(response.error);
    }

    console.log(response.payload);

    return {
        bed: response.payload.data
    }
}