import type { AxiosInstance } from '@savage181855/mini-axios';

export function setupInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(function(config) {
    console.debug(config, 'setupInterceptor')
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  instance.interceptors.response.use(function(response){
    console.debug(response)
    return response;
  }, function(error) {
    return Promise.reject(error);
  })
  
}