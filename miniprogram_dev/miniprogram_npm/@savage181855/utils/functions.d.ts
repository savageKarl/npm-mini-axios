/** lodash get方法 */
export declare type ObjectAndAarryType = Record<string, any>;
export declare function getType(o: any): string;
export declare function get(data: ObjectAndAarryType, path: string): ObjectAndAarryType;
export declare function compare<T extends object, K extends T>(o1: T, o2: K, type: "shallow" | "deep"): boolean;
/** 对象浅比较，只比较第一层数据 */
export declare function isSameShallow<T extends object, K extends T>(o1: T, o2: K): boolean;
/** 对象深比较，比较所有层数据， 深比较主要的点在于，Object或Array实例的每一个属性，基本类型或者特殊构造器类型是否相同 */
export declare function isSameDeep<T extends object, K extends T>(o1: T, o2: K): boolean;
export declare function clone<T extends object>(o: T, type: "shallow" | "deep"): T;
/** 浅拷贝，只拷贝第一层数据 */
export declare function shallowClone<T extends object>(obj: T): T;
/** 深克隆，深克隆主要的点在于，复制Object或Array实例的每一个属性，基本类型和特殊构造器类型*/
export declare function deepClone<T extends object>(obj: T): T;
export declare function isObject(value: unknown): boolean;
/** 判断值，使用深比较 */
export declare function hasChanged(value: ObjectAndAarryType, oldValue: ObjectAndAarryType): boolean;
/** 单例模式 */
export declare function getSingle<T>(fn: () => T): (this: unknown, ...args: any) => T;
