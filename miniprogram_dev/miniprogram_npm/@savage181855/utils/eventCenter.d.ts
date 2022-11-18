import type { ObjectAndAarryType } from "./functions";
interface SubscribeType {
    [index: string | symbol]: Array<(...args: any) => unknown>;
}
/** 给对象添加发布订阅的事件中心 */
export declare function installEventCenter(obj: ObjectAndAarryType): {
    subscribeList: SubscribeType;
    pubAndNoSub: SubscribeType;
    subscribe(name: string, fn: (...arg: any) => unknown): void;
    publish(name: string, value: any): void;
    remove(name: string, fn: (...args: any) => unknown): void;
} & ObjectAndAarryType;
export {};
