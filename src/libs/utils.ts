import { dataTypes } from "@savage181855/data-types";

export function extend(
  target: WechatMiniprogram.IAnyObject,
  source: WechatMiniprogram.IAnyObject,
  thisArg?: any
) {
  each(source, function (val, key) {
    if (dataTypes.isObject(thisArg) && typeof val === "function") {
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
    const keys = Reflect.ownKeys(obj);

    for (let k of keys) {
      const res = fn(obj[k as keyof T], k as keyof T, obj);
      if (dataTypes.isBoolean(res) && String(res) === "false") break;
    }
  }
}

export function serialize(obj: WechatMiniprogram.IAnyObject) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}

export function bind<T extends Function>(fn: T, thisArg: any) {
  return function () {
    return fn.apply(thisArg, arguments);
  } as any as T;
}
