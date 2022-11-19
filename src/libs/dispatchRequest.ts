import { adapter } from "./adapter";

import { AxiosRequestConfig, AxiosResponse } from "./types";

import { serialize } from "./utils";

export function dispatchRequest<T>(
  config: AxiosRequestConfig
): AxiosResponse<T> {
  // 在这里进行，baseUrl拼接，转换数据的操作等等。
  config.url = config.baseURL ? config.baseURL + config.url : config.url;

  if ((config.method === "get" || config.method === "GET") && config.params) {
    config.url = config.url + "?" + serialize(config.params);
  }

  return adapter(config);
}
