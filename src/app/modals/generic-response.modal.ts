export class GenericResponse<T> {
    status: string;
    message: string;
    payload: {
        RESULT: T;
    }
}