import { AxiosError } from 'axios';

import type { AxiosError as IAxiosError } from 'axios';

// Main exception types - can be extended to specific types in their handlers if needed
enum EXCEPTION_TYPE {
  API = 'API', // api requests
  BLOCKCHAIN = 'BLOCKCHAIN', // ProviderRpcError
  INTERACTION = 'INTERACTION', // Errors regarding user interactions with library
  INTERNAL = 'INTERNAL' // Js/Code errors - internal for library - end user should not see any of those
}

class Whal3sException {
  private type: EXCEPTION_TYPE;
  private stack: unknown;

  constructor(type: EXCEPTION_TYPE, stack: unknown) {
    this.type = type;
    this.stack = stack;
  }
}

class ExceptionHandler {
  public static Type = EXCEPTION_TYPE;

  private createException(type: EXCEPTION_TYPE, exception: unknown) {
    return new Whal3sException(type, exception);
  }

  private isStandardJsError(error: Error): boolean {
    return [TypeError, RangeError, SyntaxError, ReferenceError, EvalError].some(
      (e) => error instanceof e
    );
  }

  private handleApiError(exception: IAxiosError): never {
    // additional exception parsing goes here
    throw this.createException(EXCEPTION_TYPE.API, exception.response.data);
  }

  private handleBlockchainError(exception: Error) {
    // code from blockchain stacktrace can be used here to present different error messages
    throw this.createException(EXCEPTION_TYPE.BLOCKCHAIN, exception);
  }

  private handleInteractionError(message: string | unknown) {
    throw this.createException(EXCEPTION_TYPE.INTERACTION, message);
  }

  private handleInternalError(exception: Error) {
    throw this.createException(EXCEPTION_TYPE.INTERNAL, exception.message);
  }

  // If one does not know what type of error can happen
  public catchError(exception: unknown) {
    if (exception instanceof Whal3sException) {
      throw exception;
    }

    if (exception instanceof AxiosError) {
      return this.handleApiError(exception);
    }

    // All thrown errors should be an instance of Error
    if (!(exception instanceof Error)) {
      return this.createException(EXCEPTION_TYPE.INTERNAL, exception);
    }

    if (this.isStandardJsError(exception)) {
      return this.handleInternalError(exception);
    }

    if (exception.stack.includes('code=')) {
      return this.handleBlockchainError(exception);
    }

    // All custom errors crated for use by the librare
    return this.handleInteractionError(exception?.message || exception);
  }

  // manual set error of a given type when given error is expected
  public handleError(exception: any, type?: EXCEPTION_TYPE) {
    switch (type) {
      case EXCEPTION_TYPE.API:
        this.handleApiError(exception);
        break;
      case EXCEPTION_TYPE.BLOCKCHAIN:
        this.handleBlockchainError(exception);
        break;
      case EXCEPTION_TYPE.INTERACTION:
        this.handleInteractionError(exception);
        break;
      case EXCEPTION_TYPE.INTERNAL:
      default:
        this.handleInternalError(exception);
    }
  }
}

export default ExceptionHandler;
