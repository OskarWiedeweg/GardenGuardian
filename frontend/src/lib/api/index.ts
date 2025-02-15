import type {RequestEvent} from "@sveltejs/kit";
import {AuthResource} from "$lib/api/auth";
import {UserInfo} from "$lib/api/user";

export function api(event: RequestEvent): ApiClient {
    return new ApiClient(event);
}

class ApiClient {
    constructor(private event: RequestEvent) {
    }

    auth() {
        return new AuthResource(this.event);
    }

    user() {
        return new UserInfo(this.event);
    }

}
