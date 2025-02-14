import {type Handle, redirect} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get("accessToken");
    if (!accessToken && !event.url.pathname.startsWith("/auth")) {
        const path = event.url.pathname.slice(1);
        throw redirect(302, `/auth/login?return=${path}`);
    } else if (accessToken) {
        event.locals.accessToken = accessToken;
    }
    return resolve(event);
}