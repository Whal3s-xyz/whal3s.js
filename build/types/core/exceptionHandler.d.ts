declare enum EXCEPTION_TYPE {
    API = "API",
    BLOCKCHAIN = "BLOCKCHAIN",
    INTERACTION = "INTERACTION",
    INTERNAL = "INTERNAL"
}
declare class Whal3sException {
    private type;
    private stack;
    constructor(type: EXCEPTION_TYPE, stack: unknown);
}
declare class ExceptionHandler {
    static Type: typeof EXCEPTION_TYPE;
    private createException;
    private isStandardJsError;
    private handleApiError;
    private handleBlockchainError;
    private handleInteractionError;
    private handleInternalError;
    catchError(exception: unknown): void | Whal3sException;
    handleError(exception: any, type?: EXCEPTION_TYPE): void;
}
export default ExceptionHandler;
