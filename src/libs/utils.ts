import { dataTypes } from "@savage181855/data-types";

import _ from "lodash";

export function extend(
  target: WechatMiniprogram.IAnyObject,
  source: WechatMiniprogram.IAnyObject,
  thisArg: any
) {
  _.forEach(source, function (val, key) {
    if (dataTypes.isObject(thisArg) && dataTypes.isFunction(val)) {
      target[key] = (val as Function).bind(thisArg);
    } else {
      target[key] = val;
    }
  });
  return target;
}
