import _ from 'lodash';
import { dataTypes } from '@savage181855/data-types';

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
        _.forEach(this.handlers, function (v, i) {
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
                return this.request(_.merge(config, {
                    method: k,
                    url,
                    data: (config || {}).data,
                }));
            };
        }
        const bodyMethods = ["post", "put"];
        for (let k of bodyMethods) {
            this[k] = (url, data, config) => {
                return this.request(_.merge(config, {
                    method: k,
                    url,
                    data,
                }));
            };
        }
    }
    request(config) {
        if (dataTypes.isString(config)) {
            config = _.merge({ url: arguments[0] }, arguments[1]);
        }
        config = _.merge(this.defaults, config);
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
    _.forEach(source, function (val, key) {
        if (dataTypes.isObject(thisArg) && dataTypes.isFunction(val)) {
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
        getInstance(_.merge(defaultConfig, config));
    };
    return instance;
}
const instance = getInstance(defaultConfig);

export { instance as axios };
//# sourceMappingURL=index.mjs.map
