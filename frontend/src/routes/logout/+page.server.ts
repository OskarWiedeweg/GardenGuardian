import type {Actions} from "@sveltejs/kit";
import {deleteAuthCookies, redirectBack} from "$lib/utils";

export const actions: Actions = {
    default: async (event) => {
        deleteAuthCookies(event.cookies);
        redirectBack(event.url);
    }
}