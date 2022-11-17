import { dispatchRequest } from "./dispatchRequest";

import { Interceptor } from "./interceptor";
import { Callback } from "./types";

export class Axios {
  interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };

  constructor() {
    const methods = [
      "get",
      // "post",
      // "put",
      // "delete",
      // "trace",
      // "options",
      // "head",
      // "connect",
    ] as const;

    // methods.forEach((item) => {
    //   this[item] = this.request;
    // });
    // this["get"] = this.request;
  }

  // get: Callback;

  request() {}
}
