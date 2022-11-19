import {axios} from "@savage181855/mini-axios";
import type { AxiosRequestConfig, AxiosResponse } from '@savage181855/mini-axios';


import { setupInterceptor } from './intereptor';

interface IResponse<T> {
  data: T;
  code: number;
  msg: string;
}



const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  header: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJfbmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2ODg1ODkwOCwiZXhwIjoxNjY4OTQ1MzA4fQ.9bO04HjlbELp4AYaSxP3_q7PcjuUkclP8NWHIB-pvX4",
  },
});

export async function request<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
  setupInterceptor(instance);
  return (await instance(config)).data;
}

