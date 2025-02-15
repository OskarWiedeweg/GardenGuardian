import type {PageServerLoad} from "./$types";
import {api} from "$lib/api";
import {handleLoadError} from "$lib/api/error";

export const load: PageServerLoad = async (event) => {
    const response = await api(event).garden().handle().bed().all();
    if (response.type === "error") {
        throw handleLoadError(response.error);
    }

    return {
        beds: response.payload
    }
}