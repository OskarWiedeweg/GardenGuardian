import type {RequestEvent} from "@sveltejs/kit";
import {AuthResource} from "$lib/api/auth";

export function api(event: RequestEvent): ApiClient {
    return new ApiClient(event);
}

class ApiClient {
    constructor(private event: RequestEvent) {
    }

    auth() {
        return new AuthResource(this.event);
    }

}
