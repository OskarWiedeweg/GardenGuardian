export type ApiResponse<T> = {
    type: 'success',
    payload: T
} | {
    type: 'error',
    error: ApiError
}

export type ApiError = {
    status: number;
    payload: any;
}

export type Payload<T> = {
    data: T
}

export type CollectionPayload<T> = Payload<T[]> & {
    meta: {
        currentPage: number,
        from?: number,
        to?: number,
        lastPage: number,
        perPage: number,
        total: number
    }
}