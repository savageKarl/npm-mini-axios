import _ from "lodash";
import { dataTypes } from "@savage181855/data-types";

import { dispatchRequest } from "./dispatchRequest";
import { Interceptor } from "./interceptor";

import {
  AxiosRequestConfig,
  AxiosRequestData,
  NoBodyMethods,
  BodyMethods,
  AxiosPromise,
} from "./types";

export class Axios {
  defaults = {} as AxiosRequestConfig;
  interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };

  constructor(defaults?: AxiosRequestConfig) {
    this.defaults = defaults || {};

    const methods = [
      "get",
      "delete",
      "AxiosRequestConfig",
      "head",
      "connect",
    ] as const;

    for (let k of methods) {
      this[k] = (url: string, config: AxiosRequestConfig) => {
        return this.request(
          _.merge(config, {
            method: k,
            url,
            data: (config || {}).data,
          })
        );
      };
    }

    const bodyMethods = ["post", "put"] as const;
    for (let k of bodyMethods) {
      this[k] = (
        url: string,
        data: AxiosRequestData,
        config: AxiosRequestConfig
      ) => {
        return this.request(
          _.merge(config, {
            method: k,
            url,
            data,
          })
        );
      };
    }
  }

  request(config: AxiosRequestConfig) {
    if (dataTypes.isString(config)) {
      config = _.merge({ url: arguments[0] }, arguments[1]);
    }

    config = _.merge(this.defaults, config);

    let promise = Promise.resolve(config);
    let chain = [];

    this.interceptors.request.forEach(function (interceptors) {
      if (interceptors) {
        chain.push(interceptors?.fulfilled, interceptors?.rejected);
      }
    });
    chain.push(dispatchRequest, null);
    this.interceptors.response.forEach(function (interceptors) {
      chain.push(interceptors?.fulfilled, interceptors?.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise as AxiosPromise;
  }

  get: NoBodyMethods = () => {};
  delete: NoBodyMethods = () => {};
  head: NoBodyMethods = () => {};
  AxiosRequestConfig: NoBodyMethods = () => {};
  connect: NoBodyMethods = () => {};

  post: BodyMethods = () => {};
  put: BodyMethods = () => {};

  all<T>(p: Promise<T>[]) {
    return Promise.all(p);
  }

  race<T>(p: Promise<T>[]) {
    return Promise.race(p);
  }
}
