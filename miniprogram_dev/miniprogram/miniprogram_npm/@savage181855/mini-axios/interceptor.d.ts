import { HandlerItem, HandlersType, Callback } from "./types";
export declare class Interceptor {
    handlers: HandlersType;
    constructor();
    use(fulfilled: Callback, rejected: Callback): number;
    eject(index: number): void;
    forEach(fn: (v: HandlerItem, i: number) => any): void;
}
