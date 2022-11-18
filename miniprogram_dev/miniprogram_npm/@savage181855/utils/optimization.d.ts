declare type Callback = (...args: any) => unknown;
/**
 * @description 防抖，防止抖动，将一段时间内的多次触发控制为一次触发
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
export declare function debounce(fn: Callback, delay?: number, immediate?: boolean): (this: any, ...args: any) => void;
declare type ThrottleType = "timer" | "timestamp";
/**
 * @description 节流，将一段时间内的多次触发控制为一定时间间隔内触发一次
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
export declare function throttle(fn: Function, delay?: number, type?: ThrottleType): (this: any, ...args: any) => void;
export {};
