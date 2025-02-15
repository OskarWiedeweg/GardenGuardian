import {type Handle, type RequestEvent, redirect} from "@sveltejs/kit";
import {api} from "$lib/api";
import {handleLoadError} from "$lib/api/error";
import {buildReturnParam, deleteAuthCookies} from "$lib/utils";

function redirectAuth(event: RequestEvent) {
    throw redirect(302, `/auth/login?${buildReturnParam(event.url)}`);
}

export const handle: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get("accessToken");
    if (!accessToken && !event.url.pathname.startsWith("/auth")) {
        redirectAuth(event);
    } else if (accessToken) {
        event.locals.accessToken = accessToken;
        const response = await api(event).user().get();
        if (response.type === "error") {
            return handleLoadError(response.error, (error) => {
                if (error.status === 401) {
                    deleteAuthCookies(event.cookies);
                    redirectAuth(event)
                }
                return null;
            });
        }
        event.locals.user = response.payload.data;
    }
    return resolve(event);
}