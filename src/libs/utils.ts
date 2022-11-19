import { dataTypes } from "@savage181855/data-types";

import forEach from "lodash-es/forEach";

export function extend(
  target: WechatMiniprogram.IAnyObject,
  source: WechatMiniprogram.IAnyObject,
  thisArg: any
) {
  forEach(source, function (val, key) {
    if (dataTypes.isObject(thisArg) && typeof val === 'function') {
      target[key] = (val as Function).bind(thisArg);
    } else {
      target[key] = val;
    }
  });
  return target;
}

export function each<T extends object>(
  obj: T,
  fn: (v: T[keyof T], i: keyof T, obj: T) => unknown
) {
  if (typeof obj == "object") {
    debugger;
    for (let k in obj) {
      const res = fn(obj[k], k, obj);
      if (dataTypes.isBoolean(res) && String(res) === "false") break;
    }
  }
}

export function serialize(obj: WechatMiniprogram.IAnyObject) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
