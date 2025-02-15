// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {User} from "$lib/models";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			accessToken?: string,
			user?: User
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
