import axios, { AxiosInstance, AxiosResponse } from 'axios';

import ExceptionHandler from '../core/exceptionHandler';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient extends ExceptionHandler {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    super();
    this.instance = axios.create({
      baseURL
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;
}
