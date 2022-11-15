export interface Network {
    id: string,
    token: string,
    label: string,
    rpcUrl: string
}

export type CallbackFunctionVariadic = (...args: any[]) => void;
export type Class = new (...args: any[]) => any;
