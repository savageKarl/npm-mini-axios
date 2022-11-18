/// <reference types="miniprogram-api-typings" />
/// <reference types="node" />
/// <reference types="miniprogram-api-typings" />
export declare type Callback<T extends any | any[] = any[]> = T extends any[] ? (...arg: T) => any : (arg: T) => any;
export declare type HandlerItem = {
    fulfilled: Callback;
    rejected: Callback;
} | null;
export declare type HandlersType = HandlerItem[];
export declare type NoBodyMethods = (url: string, config: AxiosRequestConfig) => any;
export declare type BodyMethods = (url: string, data: AxiosRequestData, config: AxiosRequestConfig) => any;
export declare type AxiosRequestData = string | WechatMiniprogram.IAnyObject | ArrayBuffer;
export declare type AxiosRequestHeaders = Record<string, string | number | boolean>;
export declare type AxiosResponseHeaders = Record<string, string> & {
    "set-cookie"?: string[];
};
export interface AxiosRequestTransformer {
    (data: any, headers?: AxiosRequestHeaders): any;
}
export interface AxiosResponseTransformer {
    (data: any, headers?: AxiosResponseHeaders): any;
}
export interface AxiosAdapter {
    (config: AxiosRequestConfig): AxiosPromise;
}
export interface AxiosProxyConfig {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
}
export declare type Method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE" | "trace" | "TRACE" | "connect" | "CONNECT";
export declare type ResponseType = "arraybuffer" | "text";
export interface TransitionalOptions {
    silentJSONParsing?: boolean;
    forcedJSONParsing?: boolean;
    clarifyTimeoutError?: boolean;
}
export interface AxiosRequestConfig<D extends string | WechatMiniprogram.IAnyObject | ArrayBuffer = any> {
    url?: string;
    method?: Method;
    baseURL?: string;
    enableChunked?: boolean;
    enableCache?: boolean;
    enableHttp2?: boolean;
    enableHttpDNS?: boolean;
    enableQuic?: boolean;
    dataType?: string | "其他";
    forceCellularNetwork?: boolean;
    transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
    transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
    header?: AxiosRequestHeaders;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: D;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    responseType?: "arraybuffer" | "text";
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    decompress?: boolean;
    transitional?: TransitionalOptions;
    signal?: AbortSignal;
    insecureHTTPParser?: boolean;
}
export declare type AxiosResponse<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer> = Promise<WechatMiniprogram.RequestSuccessCallbackResult<T>>;
export interface AxiosPromise<T extends ArrayBuffer = any> extends Promise<AxiosResponse<T>> {
}
export declare type AxiosInstance<T> = {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
} & T;
