import {Resource} from "$lib/api/resource";
import type {RequestEvent} from "@sveltejs/kit";
import type {User} from "$lib/models";
import type {Payload} from "$lib/api/types";

export class AuthResource extends Resource {

    constructor(event: RequestEvent) {
        super(event, "/auth");
    }

    async login(credentials: object) {
        return this.request<Payload<AuthResponse>>("POST", "/login", credentials);
    }

    async register(credentials: object) {
        return this.request<Payload<AuthResponse>>("POST", "/register", credentials);
    }

}

export type AuthResponse = {
    accessToken: string,
    user: User
}