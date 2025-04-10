export class GenericResponse<T> {
    status: number;
    message: string;
    payload: {
        RESULT: T;
    }
}