import merge from "lodash-es/merge";
import { Axios } from "./axios";

import { defaultConfig } from "./defaultConfig";

import { extend, bind } from "./utils";

import { AxiosRequestConfig, AxiosInstance } from "./types";

export * from "./types";

function getInstance(config: AxiosRequestConfig) {
  const axios = new Axios(config);
  const instance = Axios.prototype.request.bind(axios) as AxiosInstance<Axios>;
  
  extend(instance, axios);
  extend(instance, Axios.prototype, axios);

  (instance as any).create = (config: AxiosRequestConfig) => {
    return getInstance(merge(defaultConfig, config));
  };
  return instance;
}

const instance = getInstance(defaultConfig);

export { instance as axios };
