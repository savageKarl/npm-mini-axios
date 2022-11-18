'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');
var dataTypes = require('@savage181855/data-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

function adapter(config) {
    return new Promise((resovle, reject) => {
        wx.request(Object.assign(Object.assign({}, config), { success(res) {
                resovle(res);
            },
            fail(err) {
                reject(err);
            } }));
    });
}

function dispatchRequest(config) {
    // 在这里进行，baseUrl拼接，转换数据的操作等等。
    config.url = config.baseURL ? config.baseURL + config.url : config.url;
    return adapter(config);
}

class Interceptor {
    constructor() {
        this.handlers = [];
    }
    use(fulfilled, rejected) {
        this.handlers.push({
            fulfilled,
            rejected,
        });
        const index = this.handlers.length - 1;
        return index;
    }
    eject(index) {
        if (this.handlers[index])
            this.handlers[index] = null;
    }
    forEach(fn) {
        ___default["default"].forEach(this.handlers, function (v, i) {
            if (v)
                fn(v, i);
        });
    }
}

class Axios {
    constructor(defaults) {
        this.defaults = {};
        this.interceptors = {
            request: new Interceptor(),
            response: new Interceptor(),
        };
        this.get = () => { };
        this.delete = () => { };
        this.head = () => { };
        this.AxiosRequestConfig = () => { };
        this.connect = () => { };
        this.post = () => { };
        this.put = () => { };
        this.defaults = defaults || {};
        const methods = [
            "get",
            "delete",
            "AxiosRequestConfig",
            "head",
            "connect",
        ];
        for (let k of methods) {
            this[k] = (url, config) => {
                return this.request(___default["default"].merge(config, {
                    method: k,
                    url,
                    data: (config || {}).data,
                }));
            };
        }
        const bodyMethods = ["post", "put"];
        for (let k of bodyMethods) {
            this[k] = (url, data, config) => {
                return this.request(___default["default"].merge(config, {
                    method: k,
                    url,
                    data,
                }));
            };
        }
    }
    request(config) {
        if (dataTypes.dataTypes.isString(config)) {
            config = ___default["default"].merge({ url: arguments[0] }, arguments[1]);
        }
        config = ___default["default"].merge(this.defaults, config);
        let promise = Promise.resolve(config);
        let chain = [];
        this.interceptors.request.forEach(function (interceptors) {
            if (interceptors) {
                chain.push(interceptors === null || interceptors === void 0 ? void 0 : interceptors.fulfilled, interceptors === null || interceptors === void 0 ? void 0 : interceptors.rejected);
            }
        });
        chain.push(dispatchRequest, null);
        this.interceptors.response.forEach(function (interceptors) {
            chain.push(interceptors === null || interceptors === void 0 ? void 0 : interceptors.fulfilled, interceptors === null || interceptors === void 0 ? void 0 : interceptors.rejected);
        });
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    all(p) {
        return Promise.all(p);
    }
    race(p) {
        return Promise.race(p);
    }
}

const defaultConfig = {
    url: '',
    data: {},
    header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text'
};

function extend(target, source, thisArg) {
    ___default["default"].forEach(source, function (val, key) {
        if (dataTypes.dataTypes.isObject(thisArg) && dataTypes.dataTypes.isFunction(val)) {
            target[key] = val.bind(thisArg);
        }
        else {
            target[key] = val;
        }
    });
    return target;
}

function getInstance(config) {
    const axios = new Axios(config);
    const instance = axios.request.bind(axios);
    extend(instance, Axios.prototype, axios);
    instance.create = (config) => {
        getInstance(___default["default"].merge(defaultConfig, config));
    };
    return instance;
}
const instance = getInstance(defaultConfig);

exports.axios = instance;
//# sourceMappingURL=index.js.map
