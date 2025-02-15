export type User = {
    id: string,
    name: string,
    email: string
}

export type Garden = {
    id: string
}

export type Bed = {
    id: string,
    garden?: Garden,
    name: string
    size: any
}