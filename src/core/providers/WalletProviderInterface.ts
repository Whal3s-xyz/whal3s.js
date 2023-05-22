import {Network} from "../../types";


export default interface WalletProviderInterface extends EventTarget {


    get address(): string | undefined,

    getAddress(): Promise<string | undefined>,

    switchNetwork(network: Network): Promise<boolean>,

    signMessage(message: string): Promise<string>,

    onSameNetwork(network: Network): Promise<boolean>,

    connect(network: Network): Promise<boolean>
}
