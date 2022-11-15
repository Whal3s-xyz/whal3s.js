export interface Network {
    id: string;
    token: string;
    label: string;
    rpcUrl: string;
}
export declare type CallbackFunctionVariadic = (...args: any[]) => void;
export declare type Class = new (...args: any[]) => any;
