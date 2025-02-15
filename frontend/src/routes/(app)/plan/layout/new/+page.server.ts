import type {PageServerLoad, Actions} from "./$types";
import {fail, superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {bedFormSchema} from "../schema";
import {api} from "$lib/api";
import {handleFormError} from "$lib/api/error";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const form = await superValidate(zod(bedFormSchema));

    return {
        form
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(bedFormSchema));
        if (!form.valid) {
            return fail(400, {form});
        }
        const response = await api(event)
            .garden()
            .handle()
            .bed()
            .create(form.data);

        if (response.type === "error") {
            return handleFormError(form, response.error);
        }

        throw redirect(302, `/plan/layout/${response.payload.data.id}`);
    }
}