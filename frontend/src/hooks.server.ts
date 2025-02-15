import {type Handle, redirect} from "@sveltejs/kit";
import {api} from "$lib/api";
import {handleLoadError} from "$lib/api/error";
import {buildReturnParam} from "$lib/utils";

export const handle: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get("accessToken");
    if (!accessToken && !event.url.pathname.startsWith("/auth")) {
        throw redirect(302, `/auth/login?${buildReturnParam(event.url)}`);
    } else if (accessToken) {
        event.locals.accessToken = accessToken;
        const response = await api(event).user().get();
        if (response.type === "error") {
            throw handleLoadError(response.error);
        }
        event.locals.user = response.payload.data;
    }
    return resolve(event);
}