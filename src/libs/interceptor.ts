import { HandlerType, Callback } from "./types";

export class Interceptor {
  handlers: HandlerType = [];

  constructor() {}

  use(fulfilled: Callback, rejected: Callback) {
    this.handlers.push({
      fulfilled,
      rejected,
    });

    const index = this.handlers.length - 1;
    return index;
  }
}

const i = new Interceptor();
