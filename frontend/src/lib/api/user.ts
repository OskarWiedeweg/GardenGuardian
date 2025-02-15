import {Resource} from "$lib/api/resource";
import type {RequestEvent} from "@sveltejs/kit";
import type {Payload} from "$lib/api/types";
import type {User} from "$lib/models";

export class UserInfo extends Resource {
    constructor(event: RequestEvent) {
        super(event, "/user");
    }

    async get() {
        return this.request<Payload<User>>("GET", "/");
    }
}