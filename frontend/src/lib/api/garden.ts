import {Resource} from "$lib/api/resource";
import type {RequestEvent} from "@sveltejs/kit";
import type {CollectionPayload, Payload} from "$lib/api/types";
import type {Bed} from "$lib/models";

export class GardenResource extends Resource {
    constructor(event: RequestEvent) {
        super(event, "/garden");
    }

    handle(id: string = "my") {
        const path = this.basePath + `/${id}`;
        return {
            bed: () => new BedResource(this.event, path + "/beds")
        }
    }
}

export class BedResource extends Resource {
    constructor(event: RequestEvent, path: string) {
        super(event, path);
    }

    async all() {
        return this.request<CollectionPayload<Bed>>("GET", "/");
    }

    async get(id: string) {
        return this.request<Payload<Bed>>("GET", `/${id}`);
    }

    async create(data: object) {
        return this.request<Payload<Bed>>("POST", "/", data)
    }

}