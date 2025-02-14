import type {PageServerLoad, Actions} from "./$types";
import {fail, superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {registerFormSchema} from "./schema";
import {api} from "$lib/api";
import {handleFormError} from "$lib/api/error";
import {redirectBack, setAuthCookies} from "$lib/utils";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const form = await superValidate(zod(registerFormSchema));

    return {
        form
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(registerFormSchema));
        if (!form.valid) {
            return fail(400, {form});
        }

        const response = await api(event).auth().register({
            deviceId: "Web",
            ...form.data
        });

        if (response.type === "error") {
            return handleFormError(form, response.error, "email");
        }

        setAuthCookies(response.payload.data, event.cookies);

        return redirectBack(event.url);
    }
}