export interface ResponseGenerico<T> {
    codigo: number;
    message: string;
    response: T;
}
