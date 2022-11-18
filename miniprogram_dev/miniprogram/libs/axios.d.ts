import { Interceptor } from "./interceptor";
import { AxiosRequestConfig, NoBodyMethods, BodyMethods, AxiosPromise } from "./types";
export declare class Axios {
    defaults: AxiosRequestConfig<any>;
    interceptors: {
        request: Interceptor;
        response: Interceptor;
    };
    constructor(defaults?: AxiosRequestConfig);
    request(config: AxiosRequestConfig): AxiosPromise<any>;
    get: NoBodyMethods;
    delete: NoBodyMethods;
    head: NoBodyMethods;
    AxiosRequestConfig: NoBodyMethods;
    connect: NoBodyMethods;
    post: BodyMethods;
    put: BodyMethods;
    all<T>(p: Promise<T>[]): Promise<Awaited<T>[]>;
    race<T>(p: Promise<T>[]): Promise<Awaited<T>>;
}
