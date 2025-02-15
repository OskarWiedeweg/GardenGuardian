import type {User} from "$lib/models";

let user = $state<User | undefined>();

export function getUser() {
    return user;
}

export function setUser(state: User) {
    user = state;
}