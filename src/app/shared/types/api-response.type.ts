export type ApiResponse<T> = {
    readonly success: boolean;
    readonly message?: string;
    readonly data?: T;
    readonly error?: Error
}