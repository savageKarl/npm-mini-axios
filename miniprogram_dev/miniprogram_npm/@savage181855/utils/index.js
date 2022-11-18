'use strict';

// a[3].b -> a.3.b -> [a, 3, b]
/** lodash get方法 */
function getType(o) {
    return Object.prototype.toString.call(o);
}
function get(data, path) {
    var paths = path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/\["(\w+)"\]/g, ".$1")
        .replace(/\['(\w+)'\]/g, ".$1")
        .split(".");
    return paths.reduce(function (x, y) { return x === null || x === void 0 ? void 0 : x[y]; }, data);
}
function compare(o1, o2, type) {
    if (o1 === o2)
        return true;
    // 如果基本类型不相等或者不是引用类型，并且不是对象就不用执行了
    if (typeof o1 !== "object" ||
        o1 === null ||
        typeof o2 !== "object" ||
        o2 === null) {
        return false;
    }
    var len1 = Object.keys(o1).length;
    var len2 = Object.keys(o2).length;
    if (len1 !== len2)
        return false;
    for (var _i = 0, _a = Object.keys(o1); _i < _a.length; _i++) {
        var key = _a[_i];
        if (type === "shallow") {
            if (o1[key] !== o2[key])
                return false;
        }
        if (type === "deep") {
            var result = compare(o1[key], o2[key], "deep");
            if (!result)
                return result;
        }
    }
    return true;
}
/** 对象浅比较，只比较第一层数据 */
function isSameShallow(o1, o2) {
    return compare(o1, o2, "shallow");
}
/** 对象深比较，比较所有层数据， 深比较主要的点在于，Object或Array实例的每一个属性，基本类型或者特殊构造器类型是否相同 */
function isSameDeep(o1, o2) {
    return compare(o1, o2, "deep");
}
var dataType = {
    object: "[object Object]",
    array: "[object Array]",
};
function clone(o, type) {
    var objType = getType(o);
    if (objType === dataType.object) {
        var obj_1 = {};
        Object.keys(o).forEach(function (k) {
            obj_1[k] =
                type === "shallow"
                    ? o[k]
                    : clone(o[k], "deep");
        });
        return obj_1;
    }
    if (objType === dataType.array) {
        return o.map(function (item) {
            return type === "shallow" ? item : clone(item, "deep");
        });
    }
    return o;
}
/** 浅拷贝，只拷贝第一层数据 */
function shallowClone(obj) {
    return clone(obj, "shallow");
}
/** 深克隆，深克隆主要的点在于，复制Object或Array实例的每一个属性，基本类型和特殊构造器类型*/
function deepClone(obj) {
    return clone(obj, "deep");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
/** 判断值，使用深比较 */
function hasChanged(value, oldValue) {
    return !isSameDeep(value, oldValue);
}
/** 单例模式 */
function getSingle(fn) {
    var res;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return res || (res = fn.apply(this, args));
    };
}

var EventCenter = {
    subscribeList: {},
    // 储存已发布未订阅的消息
    pubAndNoSub: {},
    subscribe: function (name, fn) {
        var _a;
        if (this.pubAndNoSub[name]) {
            fn(this.pubAndNoSub[name]);
            Reflect.deleteProperty(this.pubAndNoSub, name);
        }
        ((_a = this.subscribeList[name]) === null || _a === void 0 ? void 0 : _a.push(fn)) || (this.subscribeList[name] = [fn]);
    },
    publish: function (name, value) {
        var fns = this.subscribeList[name];
        if (!fns || fns.length === 0) {
            this.pubAndNoSub[name] = value;
        }
        else {
            fns.forEach(function (fn) { return fn(value); });
        }
    },
    remove: function (name, fn) {
        var _this = this;
        var fns = this.subscribeList[name];
        if (!fns || fns.length === 0)
            return;
        if (fn) {
            fns.forEach(function (_fn, index) {
                if (_fn === fn) {
                    _this.subscribeList[name].splice(index, 1);
                }
            });
        }
        else {
            this.subscribeList[name] = [];
        }
    },
};
/** 给对象添加发布订阅的事件中心 */
function installEventCenter(obj) {
    var cloneObj = deepClone(EventCenter);
    for (var k in EventCenter)
        obj[k] = cloneObj[k];
    return obj;
}

/** 解析省市区列表数据，提供给uView组件使用 */
function parseAreaListData(areaData) {
    var temp = [];
    var province_list = areaData.province_list, city_list = areaData.city_list, county_list = areaData.county_list;
    for (var provinceCode in province_list) {
        var provinceId = provinceCode.substr(0, 2);
        var provinceItem = {};
        provinceItem.value = province_list[provinceCode];
        provinceItem.label = province_list[provinceCode];
        for (var cityCode in city_list) {
            var cityId = cityCode.substr(0, 4);
            var cityItem = {};
            if (cityId.includes(provinceId)) {
                cityItem.value = city_list[cityCode];
                cityItem.label = city_list[cityCode];
                for (var countyCode in county_list) {
                    var countyItem = {};
                    if (countyCode.includes(cityId)) {
                        countyItem.value = county_list[countyCode];
                        countyItem.label = county_list[countyCode];
                        cityItem.children.push(countyItem);
                    }
                }
                provinceItem.children.push(cityItem);
            }
        }
        temp.push(provinceItem);
    }
    return temp;
}

/**
 * @description 防抖，防止抖动，将一段时间内的多次触发控制为一次触发
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
function debounce(fn, delay, immediate) {
    if (delay === void 0) { delay = 1500; }
    if (immediate === void 0) { immediate = true; }
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        if (immediate) {
            if (!timer)
                fn.apply(this, args);
            timer = setTimeout(function () { return (timer = null); }, delay);
        }
        else {
            timer = setTimeout(function () { return fn.apply(_this, args); }, delay);
        }
    };
}
/**
 * @description 节流，将一段时间内的多次触发控制为一定时间间隔内触发一次
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
function throttle(fn, delay, type) {
    if (delay === void 0) { delay = 1500; }
    if (type === void 0) { type = "timestamp"; }
    if (type === "timestamp") {
        var prevTime_1 = 0;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var currentTime = Date.now();
            if (currentTime - prevTime_1 > delay) {
                fn.apply(this, args);
                prevTime_1 = currentTime;
            }
        };
    }
    else {
        var timer_1;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!timer_1) {
                timer_1 = setTimeout(function () {
                    fn.apply(_this, args);
                    timer_1 = null;
                }, delay);
            }
        };
    }
}

exports.clone = clone;
exports.compare = compare;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.get = get;
exports.getSingle = getSingle;
exports.getType = getType;
exports.hasChanged = hasChanged;
exports.installEventCenter = installEventCenter;
exports.isObject = isObject;
exports.isSameDeep = isSameDeep;
exports.isSameShallow = isSameShallow;
exports.parseAreaListData = parseAreaListData;
exports.shallowClone = shallowClone;
exports.throttle = throttle;
