import { AxiosInstance } from 'axios';
import ExceptionHandler from '../core/exceptionHandler';
declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}
export declare abstract class AbstractUtility extends EventTarget {
    protected readonly abortController: AbortController;
    protected readonly instance: AxiosInstance;
    protected readonly exceptionHandler: ExceptionHandler;
    constructor(baseURL: string);
    private _initializeResponseInterceptor;
    private _handleResponse;
    private _initializeRequestInterceptor;
    private _handleRequest;
}
