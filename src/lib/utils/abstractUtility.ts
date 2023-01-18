import axios, { AxiosInstance, AxiosResponse } from 'axios';

import ExceptionHandler from '../core/exceptionHandler';
import {AxiosRequestConfig} from "axios/index";

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class AbstractUtility extends EventTarget {

  protected readonly abortController: AbortController;

  protected readonly instance: AxiosInstance;
  protected readonly exceptionHandler: ExceptionHandler

  public constructor(baseURL: string) {
    super();
    this.instance = axios.create({
      baseURL
    });
    this.abortController = new AbortController()
    this.exceptionHandler = new ExceptionHandler()

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest);
  };
  private _handleRequest = (config: AxiosRequestConfig) => {
    // config.headers['Authorization'] = `Bearer ${this.apiKey}`;
    return config;
  };
}
