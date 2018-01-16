(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["because"] = factory();
	else
		root["because"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BecauseError = (function () {
    function BecauseError(message, text) {
        this.name = "BecauseError";
        this.message = message;
        this.text = text || message;
    }
    return BecauseError;
}());
exports.BecauseError = BecauseError;
var InvalidObject = (function (_super) {
    __extends(InvalidObject, _super);
    function InvalidObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "InvalidObject";
        return _this;
    }
    return InvalidObject;
}(BecauseError));
exports.InvalidObject = InvalidObject;
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParseError;
}(BecauseError));
exports.ParseError = ParseError;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var data_1 = __webpack_require__(4);
var table_1 = __webpack_require__(9);
var headers_1 = __webpack_require__(2);
var request_1 = __webpack_require__(17);
var query_1 = __webpack_require__(3);
var format_1 = __webpack_require__(28);
var EndpointData = (function (_super) {
    __extends(EndpointData, _super);
    function EndpointData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EndpointData;
}(data_1.Data));
var EndpointTable = (function (_super) {
    __extends(EndpointTable, _super);
    function EndpointTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EndpointTable;
}(table_1.MutableTable));
var ServiceError = (function (_super) {
    __extends(ServiceError, _super);
    function ServiceError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServiceError;
}(errors_1.BecauseError));
exports.ServiceError = ServiceError;
var Service = (function () {
    function Service(endpoints, headers) {
        endpoints = endpoints || this.endpoints || {};
        this.table = new EndpointTable(endpoints);
        this.headers = headers || new headers_1.Headers();
    }
    Service.prototype.endpoint = function (name) {
        var result = this.table.get(name);
        if (!result) {
            var keys = this.table.keys().join(", ") || "no endpoints!";
            throw new ServiceError("no endpoint named " + name + ".\n                available endpoints for this service: " + keys);
        }
        return result;
    };
    Service.prototype.request = function (endpoint_name, method, base, args) {
        var endpoint = this.endpoint(endpoint_name);
        var url = endpoint.url(base, args);
        var query = this.query.updated(endpoint.query(args));
        var headers = this.headers.updated(endpoint.headers(args));
        var body = endpoint.body(args);
        return new request_1.Request(method, url, query, body, headers);
    };
    return Service;
}());
exports.Service = Service;
var Endpoint = (function () {
    function Endpoint(method, uri, query, headers, body) {
        this.method = method;
        this._uri = uri;
        if (!query || typeof query === "object") {
            this.default_query = query || new query_1.Query();
        }
        else if (typeof query === "function") {
            this.query_function = query;
        }
        if (!headers || typeof headers === "object") {
            this.default_headers = headers || new headers_1.Headers();
        }
        else if (typeof headers === "function") {
            this.headers_function = headers;
        }
        if (!body || typeof body === "string") {
            this.default_body = body || "";
        }
        else if (typeof body === "function") {
            this.body_function = body;
        }
    }
    Endpoint.prototype.uri = function (args, append_query) {
        if (append_query === void 0) { append_query = false; }
        args = args || {};
        var string_args = {};
        for (var _i = 0, _a = Object.keys(args); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = args[key] || "";
            if (value === undefined) {
                value = "";
            }
            else if (typeof value === "number") {
                value = value.toString();
            }
            else {
                value = value;
            }
            string_args[key] = value;
        }
        var uri = format_1.format(this._uri, string_args);
        if (append_query) {
            var query = this.query(args);
            var qs = query.encoded;
            if (qs) {
                return uri + "?" + qs;
            }
        }
        return uri;
    };
    Endpoint.prototype.url = function (base, args, append_query) {
        if (append_query === void 0) { append_query = false; }
        if (!/^https?:\/\/.*$/.test(base)) {
            throw new Error("invalid URL base " + base);
        }
        var uri = this.uri(args, append_query).replace(/^[/]+/g, "");
        base = base.replace(/[/]+$/g, "");
        return base + "/" + uri;
    };
    Endpoint.prototype.query = function (args) {
        var query;
        if (this.query_function) {
            query = this.query_function(args || {});
        }
        else {
            query = this.default_query.copy();
        }
        return query;
    };
    Endpoint.prototype.headers = function (args) {
        var headers;
        if (this.headers_function) {
            headers = this.headers_function(args || {});
        }
        else {
            headers = this.default_headers.copy();
        }
        return headers;
    };
    Endpoint.prototype.body = function (args) {
        var body;
        if (this.body_function) {
            body = this.body_function(args || {});
        }
        else {
            body = this.default_body;
        }
        return body;
    };
    Endpoint.prototype.request = function (base, args) {
        var query = this.query(args);
        var headers = this.headers(args);
        var body = this.body(args);
        var request = new request_1.Request(this.method, this.url(base, args, false), query, body, headers);
        return request;
    };
    return Endpoint;
}());
exports.Endpoint = Endpoint;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __webpack_require__(4);
var table_1 = __webpack_require__(9);
var HeaderData = (function (_super) {
    __extends(HeaderData, _super);
    function HeaderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HeaderData;
}(data_1.Data));
exports.HeaderData = HeaderData;
function normalize(key) {
    return key.toLowerCase();
}
function parse_headers(headers, limit) {
    if (!headers) {
        return {};
    }
    if (limit && headers.length > limit) {
        throw new Error("not parsing oversized headers string");
    }
    var line_sep = "\r\n";
    var lines = headers.split(line_sep);
    var pair_sep = ": ";
    var data = {};
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var index = line.indexOf(pair_sep);
        var key = line.slice(0, index);
        var value = line.slice(index + pair_sep.length);
        if (key) {
            data[key] = value;
        }
    }
    return data;
}
exports.parse_headers = parse_headers;
var Headers = (function (_super) {
    __extends(Headers, _super);
    function Headers(data) {
        var _this = this;
        var normalized = data_1.map(data || {}, function (key, value) {
            return [normalize(key), value];
        });
        _this = _super.call(this, normalized) || this;
        return _this;
    }
    Headers.parse = function (blob) {
        var data = parse_headers(blob);
        return new Headers(data);
    };
    Headers.prototype.get = function (key) {
        return this._data[normalize(key)];
    };
    Headers.prototype.set = function (key, value) {
        var result;
        if (typeof (value) === "string") {
            result = value;
        }
        else {
            result = value.join(",");
        }
        this._data[normalize(key)] = result;
    };
    return Headers;
}(table_1.MutableTable));
exports.Headers = Headers;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __webpack_require__(4);
var table_1 = __webpack_require__(9);
var QueryData = (function (_super) {
    __extends(QueryData, _super);
    function QueryData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryData;
}(data_1.Data));
exports.QueryData = QueryData;
var Query = (function (_super) {
    __extends(Query, _super);
    function Query(data) {
        return _super.call(this, data || {}) || this;
    }
    Object.defineProperty(Query.prototype, "encoded", {
        get: function () {
            var components = as_uri_components(this._data);
            return as_query_string(components);
        },
        enumerable: true,
        configurable: true
    });
    Query.prototype.url = function (url) {
        var encoded = this.encoded;
        var result = encoded ? url + "?" + encoded : url;
        return result;
    };
    Query.prototype.copy = function () {
        return new Query(data_1.copy(this._data));
    };
    Query.prototype.updated = function (other) {
        var data = data_1.updated(this._data, other.data());
        var result = new Query(data);
        return result;
    };
    return Query;
}(table_1.MutableTable));
exports.Query = Query;
function as_uri_components(data) {
    return data_1.map(data, function (key, value) {
        if (typeof value === "number") {
            value = value.toString();
        }
        return [
            encodeURIComponent(key),
            encodeURIComponent(value),
        ];
    });
}
exports.as_uri_components = as_uri_components;
function as_query_string(data) {
    return data_1.as_string(data, "&", "=");
}
exports.as_query_string = as_query_string;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Data = (function () {
    function Data() {
    }
    return Data;
}());
exports.Data = Data;
function length(data) {
    return Object.keys(data).length;
}
exports.length = length;
function keys(data) {
    var result = [];
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            result.push(property);
        }
    }
    return result;
}
exports.keys = keys;
function values(data) {
    var result = [];
    for (var _i = 0, _a = keys(data); _i < _a.length; _i++) {
        var key = _a[_i];
        result.push(data[key]);
    }
    return result;
}
exports.values = values;
function pairs(data) {
    var result = [];
    for (var _i = 0, _a = keys(data); _i < _a.length; _i++) {
        var key = _a[_i];
        result.push([key, data[key]]);
    }
    return result;
}
exports.pairs = pairs;
function equals(a, b) {
    if (a === b) {
        return true;
    }
    var keys_a = keys(a);
    var keys_b = keys(b);
    if (keys_a.length !== keys_b.length) {
        return false;
    }
    keys_a.sort();
    keys_b.sort();
    for (var i = 0; i < keys_a.length; i++) {
        var key_a = keys_a[i];
        var key_b = keys_b[i];
        if (key_a !== key_b) {
            return false;
        }
        var value_a = a[key_a];
        var value_b = b[key_b];
        if (value_a !== value_b) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
function arrays_equal(a, b) {
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; i++) {
        var item_a = a[i];
        var item_b = b[i];
        if (item_a !== item_b) {
            return false;
        }
    }
    return true;
}
exports.arrays_equal = arrays_equal;
function pairs_equal(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; i++) {
        var _a = a[i], ak = _a[0], av = _a[1];
        var _b = b[i], bk = _b[0], bv = _b[1];
        if (ak !== bk || av !== bv) {
            return false;
        }
    }
    return true;
}
exports.pairs_equal = pairs_equal;
function each(data, callback) {
    for (var _i = 0, _a = pairs(data); _i < _a.length; _i++) {
        var pair = _a[_i];
        callback(pair[0], pair[1]);
    }
}
exports.each = each;
function map_pairs(data, callback) {
    var result = [];
    for (var _i = 0, _a = pairs(data); _i < _a.length; _i++) {
        var pair = _a[_i];
        result.push(callback(pair[0], pair[1]));
    }
    return result;
}
function map(data, callback) {
    var result = {};
    for (var _i = 0, _a = map_pairs(data, callback); _i < _a.length; _i++) {
        var pair = _a[_i];
        var key = pair[0], value = pair[1];
        result[key] = value;
    }
    return result;
}
exports.map = map;
function copy(data) {
    return map(data, function (key, value) {
        return [key, value];
    });
}
exports.copy = copy;
function updated(data, other) {
    var result = copy(data);
    for (var property in other) {
        if (other.hasOwnProperty(property)) {
            result[property] = other[property];
        }
    }
    return result;
}
exports.updated = updated;
function as_strings(data, sep) {
    if (sep === void 0) { sep = "="; }
    var result = [];
    for (var _i = 0, _a = pairs(data); _i < _a.length; _i++) {
        var pair = _a[_i];
        result.push(pair.join(sep));
    }
    return result;
}
exports.as_strings = as_strings;
function as_string(data, sep, item_sep) {
    if (item_sep === void 0) { item_sep = "="; }
    return as_strings(data, item_sep).join(sep);
}
exports.as_string = as_string;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message, response, code, text) {
        var _this = _super.call(this, message, text || message) || this;
        _this.response = response;
        _this.code = code;
        _this.name = "ParseError";
        _this.response = response;
        _this.code = code;
        return _this;
    }
    return ParseError;
}(errors_1.BecauseError));
var MayHaveError = (function () {
    function MayHaveError() {
    }
    return MayHaveError;
}());
function parse_response(response) {
    if (!response) {
        throw new Error("no response");
    }
    if (!response.body) {
        throw new Error("response has no body");
    }
    if (response.status < 200 || response.status > 299) {
        var message = "error response: " + response.status;
        throw new Error(message);
    }
    var data = JSON.parse(response.body);
    if (data.errorCode || data.errorMessage) {
        var code = data.errorCode;
        var message = data.errorMessage;
        throw new ParseError("error body in response: code " + code + ": " + message, response, code, message);
    }
    return data;
}
exports.parse_response = parse_response;
function parse_array(response) {
    if (!response) {
        throw new Error("no response");
    }
    if (!response.body) {
        throw new Error("response has no body");
    }
    if (response.status < 200 || response.status > 299) {
        var message = "error response: " + response.status;
        throw new Error(message);
    }
    var data = JSON.parse(response.body);
    return data;
}
exports.parse_array = parse_array;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(8);
var ServiceFrontend = (function () {
    function ServiceFrontend(service, frontend, host) {
        this.service = service;
        this._frontend = frontend;
        this.host = host;
        this.log = new log_1.Log("ServiceFrontend");
    }
    ServiceFrontend.prototype.send = function (request) {
        this.log.debug("send", { "request": request });
        return this._frontend.send(request);
    };
    ServiceFrontend.prototype.need_login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, key;
            return __generator(this, function (_a) {
                jwt = this._frontend ? this._frontend.jwt : undefined;
                key = this._frontend ? this._frontend.key : undefined;
                if (!jwt || !jwt.token) {
                    if (key) {
                        return [2, key];
                    }
                    else {
                        throw new Error("not logged in");
                    }
                }
                else {
                    return [2, jwt];
                }
                return [2];
            });
        });
    };
    return ServiceFrontend;
}());
exports.ServiceFrontend = ServiceFrontend;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function is_coordinates(arg) {
    return (typeof arg === "object" && arg.length === 2);
}
exports.is_coordinates = is_coordinates;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.equals = function (other) {
        return (other.x === this.x && other.y === this.y);
    };
    return Point;
}());
exports.Point = Point;
var Address = (function (_super) {
    __extends(Address, _super);
    function Address() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Address;
}(String));
exports.Address = Address;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __webpack_require__(4);
var Level;
(function (Level) {
    Level[Level["debug"] = 7] = "debug";
    Level[Level["info"] = 6] = "info";
    Level[Level["notice"] = 5] = "notice";
    Level[Level["warning"] = 4] = "warning";
    Level[Level["error"] = 3] = "error";
    Level[Level["critical"] = 2] = "critical";
})(Level || (Level = {}));
var level_names = {};
level_names[Level.debug] = "debug";
level_names[Level.warning] = "warning";
level_names[Level.error] = "error";
var Log = (function () {
    function Log(name) {
        this.name = name;
    }
    Log.prototype.emit = function (level, text, args) {
        var level_name = level_names[level];
        var prefix = this.name + ": " + level_name + ": " + text;
        for (var _i = 0, _a = data_1.pairs(args || {}); _i < _a.length; _i++) {
            var pair = _a[_i];
            var key = pair[0], value = pair[1];
            console.log(prefix, key, value);
        }
    };
    Log.prototype.debug = function (text, args) {
        this.emit(Level.debug, text, args);
    };
    Log.prototype.warning = function (text, args) {
        this.emit(Level.warning, text, args);
    };
    Log.prototype.error = function (text, args) {
        this.emit(Level.error, text, args);
    };
    return Log;
}());
exports.Log = Log;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __webpack_require__(4);
var Table = (function () {
    function Table(data) {
        this._data = data;
    }
    Object.defineProperty(Table.prototype, "length", {
        get: function () {
            return data_1.length(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.equals = function (table) {
        return data_1.equals(table._data, this._data);
    };
    Table.prototype.copy = function () {
        return new Table(data_1.copy(this._data));
    };
    Table.prototype.updated = function (other) {
        var data = data_1.updated(this._data, other._data);
        return new Table(data);
    };
    Table.prototype.data = function () {
        return data_1.copy(this._data);
    };
    Table.prototype.get = function (key) {
        return this._data[key];
    };
    Table.prototype.keys = function () {
        return data_1.keys(this._data);
    };
    Table.prototype.values = function () {
        return data_1.values(this._data);
    };
    Table.prototype.pairs = function () {
        return data_1.pairs(this._data);
    };
    Table.prototype.each = function (callback) {
        data_1.each(this._data, callback);
    };
    Table.prototype.map = function (callback) {
        return new Table(data_1.map(this._data, callback));
    };
    return Table;
}());
exports.Table = Table;
var MutableTable = (function (_super) {
    __extends(MutableTable, _super);
    function MutableTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MutableTable.prototype.set = function (key, value) {
        this._data[key] = value;
    };
    MutableTable.prototype.copy = function () {
        return new MutableTable(data_1.copy(this._data));
    };
    MutableTable.prototype.updated = function (other) {
        var data = data_1.updated(this._data, other.data());
        var result = new MutableTable(data);
        return result;
    };
    MutableTable.prototype.update = function (other) {
        for (var _i = 0, _a = other.pairs(); _i < _a.length; _i++) {
            var pair = _a[_i];
            var key = pair[0], value = pair[1];
            this.set(key, value);
        }
    };
    return MutableTable;
}(Table));
exports.MutableTable = MutableTable;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_frontend_1 = __webpack_require__(6);
var service_1 = __webpack_require__(33);
var parse_1 = __webpack_require__(32);
var BasemapFrontend = (function (_super) {
    __extends(BasemapFrontend, _super);
    function BasemapFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.BasemapService();
        _this = _super.call(this, service, frontend, host) || this;
        return _this;
    }
    BasemapFrontend.prototype.basemaps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("basemaps");
                        request = endpoint.request(this.host.url);
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_basemaps(response)];
                }
            });
        });
    };
    BasemapFrontend.prototype.providers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("providers");
                        request = endpoint.request(this.host.url);
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    BasemapFrontend.prototype.provider = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("provider");
                        request = endpoint.request(this.host.url, {
                            "provider": name,
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    BasemapFrontend.prototype.manage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("manage");
                        request = endpoint.request(this.host.url);
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    return BasemapFrontend;
}(service_frontend_1.ServiceFrontend));
exports.BasemapFrontend = BasemapFrontend;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(8);
var service_frontend_1 = __webpack_require__(6);
var service_1 = __webpack_require__(35);
var parse_1 = __webpack_require__(20);
var GeocodingFrontend = (function (_super) {
    __extends(GeocodingFrontend, _super);
    function GeocodingFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.GeocodingService();
        _this = _super.call(this, service, frontend, host) || this;
        _this.log = new log_1.Log("geocoding");
        return _this;
    }
    GeocodingFrontend.prototype.geocode = function (address, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.need_login()];
                    case 1:
                        _a.sent();
                        provider = provider || "mapbox";
                        if (!address) {
                            throw new Error("need an address to geocode");
                        }
                        endpoint = this.service.endpoint("forward");
                        request = endpoint.request(this.host.url, {
                            "provider": provider,
                            "address": encodeURIComponent(address),
                        });
                        return [4, this.send(request)];
                    case 2:
                        response = _a.sent();
                        this.log.debug("geocode", { "response": response });
                        return [2, parse_1.parse_geocodes(response)];
                }
            });
        });
    };
    GeocodingFrontend.prototype.reverse_geocode = function (coordinates, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.need_login()];
                    case 1:
                        _a.sent();
                        if (!coordinates) {
                            throw new Error("need coordinates to reverse geocode");
                        }
                        endpoint = this.service.endpoint("reverse");
                        request = endpoint.request(this.host.url, {
                            "provider": provider || "mapbox",
                            "x": coordinates[1],
                            "y": coordinates[0],
                        });
                        return [4, this.send(request)];
                    case 2:
                        response = _a.sent();
                        this.log.debug("reverse_geocode", { "response": response });
                        return [2, parse_1.parse_geocodes(response)];
                }
            });
        });
    };
    return GeocodingFrontend;
}(service_frontend_1.ServiceFrontend));
exports.GeocodingFrontend = GeocodingFrontend;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var service_frontend_1 = __webpack_require__(6);
var service_1 = __webpack_require__(38);
var parse_1 = __webpack_require__(37);
var LoginError = (function (_super) {
    __extends(LoginError, _super);
    function LoginError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoginError;
}(errors_1.BecauseError));
exports.LoginError = LoginError;
var KeyFrontend = (function (_super) {
    __extends(KeyFrontend, _super);
    function KeyFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.KeyService();
        _this = _super.call(this, service, frontend, host) || this;
        return _this;
    }
    KeyFrontend.prototype.validate_key = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key) {
                            throw new LoginError("key is required");
                        }
                        endpoint = this.service.endpoint("validate_key");
                        request = endpoint.request(this.host.url, {
                            "key": encodeURIComponent(key),
                            "apikey": key
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_key_validate(response)];
                }
            });
        });
    };
    KeyFrontend.prototype.get_organizations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("get_organizations");
                        request = endpoint.request(this.host.url);
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_Organizations(response)];
                }
            });
        });
    };
    KeyFrontend.prototype.get_roles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("get_roles");
                        request = endpoint.request(this.host.url);
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_roles(response)];
                }
            });
        });
    };
    KeyFrontend.prototype.create_key = function (orgid, expirequantity, expireunit, roles) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("create_key");
                        request = endpoint.request(this.host.url, {
                            "organizationId": orgid,
                            "expireQuantity": expirequantity,
                            "expireUnit": expireunit,
                            "roles": roles
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_wrapped_key(response)];
                }
            });
        });
    };
    return KeyFrontend;
}(service_frontend_1.ServiceFrontend));
exports.KeyFrontend = KeyFrontend;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_frontend_1 = __webpack_require__(6);
var parse_1 = __webpack_require__(21);
var service_1 = __webpack_require__(40);
var route_1 = __webpack_require__(22);
var location_1 = __webpack_require__(7);
var RoutingFrontend = (function (_super) {
    __extends(RoutingFrontend, _super);
    function RoutingFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.RoutingService();
        _this = _super.call(this, service, frontend, host) || this;
        return _this;
    }
    RoutingFrontend.prototype.get_routings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("metadata");
                        request = endpoint.request(this.host.url, {});
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_routings(response)];
                }
            });
        });
    };
    RoutingFrontend.prototype.route = function (locations, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var strings, _i, locations_1, loc, one, loc_type, endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.need_login()];
                    case 1:
                        _a.sent();
                        provider = provider || "mapbox";
                        if (locations.length < 2) {
                            throw new Error("need at least two locations to route");
                        }
                        strings = [];
                        for (_i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                            loc = locations_1[_i];
                            one = void 0;
                            if (typeof loc === "string") {
                                one = loc;
                            }
                            else if (loc instanceof location_1.Point) {
                                one = loc.y + "," + loc.x;
                            }
                            else if (location_1.is_coordinates(loc)) {
                                one = loc[1] + "," + loc[0];
                            }
                            else {
                                loc_type = (typeof loc);
                                throw new Error("unsupported location type: " + loc_type);
                            }
                            strings.push(one);
                        }
                        endpoint = this.service.endpoint("waypoints");
                        request = endpoint.request(this.host.url, {
                            "provider": provider,
                            "waypoints": strings.join("|") || "",
                        });
                        return [4, this.send(request)];
                    case 2:
                        response = _a.sent();
                        return [2, route_1.Route.parse(response)];
                }
            });
        });
    };
    return RoutingFrontend;
}(service_frontend_1.ServiceFrontend));
exports.RoutingFrontend = RoutingFrontend;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_frontend_1 = __webpack_require__(6);
var service_1 = __webpack_require__(44);
var parse_1 = __webpack_require__(42);
var SearchFrontend = (function (_super) {
    __extends(SearchFrontend, _super);
    function SearchFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.SearchService();
        _this = _super.call(this, service, frontend, host) || this;
        return _this;
    }
    SearchFrontend.prototype.search = function (text, categories, results_per_page, starting_page) {
        if (categories === void 0) { categories = ["ALL"]; }
        if (results_per_page === void 0) { results_per_page = 20; }
        if (starting_page === void 0) { starting_page = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, cat, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("search");
                        cat = categories.join(",");
                        request = endpoint.request(this.host.url, {
                            "text": text,
                            "cat": cat,
                            "results_per_page": results_per_page,
                            "starting_page": starting_page,
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_search_results(response)];
                }
            });
        });
    };
    SearchFrontend.prototype.search_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("search_data");
                        request = endpoint.request(this.host.url, {});
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_search_results(response)];
                }
            });
        });
    };
    SearchFrontend.prototype.get_categories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("categories");
                        request = endpoint.request(this.host.url, {});
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_search_categories(response)];
                }
            });
        });
    };
    SearchFrontend.prototype.search_in_category = function (category, q) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.service.endpoint("search_in_category");
                        request = endpoint.request(this.host.url, {
                            "category": category,
                            "q": q,
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.parse_search_results(response)];
                }
            });
        });
    };
    return SearchFrontend;
}(service_frontend_1.ServiceFrontend));
exports.SearchFrontend = SearchFrontend;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var service_frontend_1 = __webpack_require__(6);
var service_1 = __webpack_require__(48);
var parse_1 = __webpack_require__(47);
var LoginError = (function (_super) {
    __extends(LoginError, _super);
    function LoginError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoginError;
}(errors_1.BecauseError));
exports.LoginError = LoginError;
var TokenFrontend = (function (_super) {
    __extends(TokenFrontend, _super);
    function TokenFrontend(frontend, host) {
        var _this = this;
        var service = new service_1.TokenService();
        _this = _super.call(this, service, frontend, host) || this;
        return _this;
    }
    TokenFrontend.prototype.get_token = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username) {
                            throw new LoginError("username is required");
                        }
                        if (!password) {
                            throw new LoginError("password is required");
                        }
                        endpoint = this.service.endpoint("get_token");
                        request = endpoint.request(this.host.url, {
                            "username": username,
                            "password": password,
                        });
                        return [4, this.send(request)];
                    case 1:
                        response = _a.sent();
                        return [2, parse_1.response_to_jwt(response)];
                }
            });
        });
    };
    TokenFrontend.prototype.get_roles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.need_login()];
                    case 1:
                        _a.sent();
                        endpoint = this.service.endpoint("get_roles");
                        request = endpoint.request(this.host.url, {});
                        return [4, this.send(request)];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    TokenFrontend.prototype.get_apikey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    TokenFrontend.prototype.get_oauth = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    return TokenFrontend;
}(service_frontend_1.ServiceFrontend));
exports.TokenFrontend = TokenFrontend;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = __webpack_require__(2);
var InvalidHost = (function (_super) {
    __extends(InvalidHost, _super);
    function InvalidHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidHost;
}(Error));
exports.InvalidHost = InvalidHost;
var Host = (function () {
    function Host(url, headers) {
        this.url = url;
        var regex = /^(https?):\/\/(.+)$/;
        if (!url.match(regex)) {
            throw new InvalidHost("can't create Host with malformed URL: " + url);
        }
        this.headers = headers || new headers_1.Headers();
    }
    return Host;
}());
exports.Host = Host;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var query_1 = __webpack_require__(3);
var headers_1 = __webpack_require__(2);
var RequestHeaderData = (function (_super) {
    __extends(RequestHeaderData, _super);
    function RequestHeaderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestHeaderData;
}(headers_1.HeaderData));
exports.RequestHeaderData = RequestHeaderData;
var InvalidRequest = (function (_super) {
    __extends(InvalidRequest, _super);
    function InvalidRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "InvalidRequest";
        return _this;
    }
    return InvalidRequest;
}(errors_1.InvalidObject));
exports.InvalidRequest = InvalidRequest;
var Request = (function () {
    function Request(method, url, query, body, headers) {
        this.method = method;
        if (url.indexOf("?") > -1) {
            throw new InvalidRequest("argument for url parameter must not include ?");
        }
        this._url = url;
        this.query = query || new query_1.Query();
        this.headers = headers || new headers_1.Headers();
        this.body = body || "";
    }
    Request.prototype.equals = function (request) {
        return (request.method === this.method
            && request.url === this.url
            && request.body === this.body
            && request.query.equals(this.query)
            && request.headers.equals(this.headers));
    };
    Request.prototype.copy = function () {
        return new Request(this.method, this._url, this.query, this.body, this.headers ? this.headers.copy() : this.headers);
    };
    Object.defineProperty(Request.prototype, "url", {
        get: function () {
            var result;
            var query_string = this.query.encoded;
            if (query_string) {
                result = this._url + "?" + query_string;
            }
            else {
                result = this._url;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return Request;
}());
exports.Request = Request;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var headers_1 = __webpack_require__(2);
var ResponseHeaderData = (function (_super) {
    __extends(ResponseHeaderData, _super);
    function ResponseHeaderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResponseHeaderData;
}(headers_1.HeaderData));
exports.ResponseHeaderData = ResponseHeaderData;
var InvalidResponse = (function (_super) {
    __extends(InvalidResponse, _super);
    function InvalidResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidResponse;
}(errors_1.InvalidObject));
exports.InvalidResponse = InvalidResponse;
var Response = (function () {
    function Response(status, headers, body) {
        this.status = status;
        if (headers instanceof headers_1.Headers) {
            this._headers = headers;
        }
        else if (headers instanceof Function) {
            this._get_headers = headers;
        }
        else {
            this._headers = new headers_1.Headers(headers || {});
        }
        this.body = body || "";
    }
    Object.defineProperty(Response.prototype, "headers", {
        get: function () {
            if (!this._headers) {
                this._headers = this._get_headers();
            }
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    return Response;
}());
exports.Response = Response;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = __webpack_require__(7);
var parse_1 = __webpack_require__(20);
var GeocodesData = (function () {
    function GeocodesData() {
    }
    return GeocodesData;
}());
exports.GeocodesData = GeocodesData;
var GeocodeData = (function () {
    function GeocodeData() {
    }
    return GeocodeData;
}());
exports.GeocodeData = GeocodeData;
var Geocode = (function (_super) {
    __extends(Geocode, _super);
    function Geocode(address, source, score, x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.address = address;
        _this.source = source;
        _this.score = score;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Geocode.parse = function (response) {
        return parse_1.parse_geocodes(response);
    };
    return Geocode;
}(location_1.Point));
exports.Geocode = Geocode;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var parse_1 = __webpack_require__(5);
var geocode_1 = __webpack_require__(19);
var GeocodingParseError = (function (_super) {
    __extends(GeocodingParseError, _super);
    function GeocodingParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeocodingParseError;
}(errors_1.BecauseError));
function parse_geocodes(response) {
    var data = parse_1.parse_response(response);
    return data.geocodePoints.map(function (item) {
        return new geocode_1.Geocode(item.candidatePlace, item.candidateSource, item.score, item.y, item.x);
    });
}
exports.parse_geocodes = parse_geocodes;
var GeocodingData = (function () {
    function GeocodingData() {
    }
    return GeocodingData;
}());
function parse_geocodings(response) {
    var records = parse_1.parse_array(response);
    return records;
}
exports.parse_geocodings = parse_geocodings;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var parse_1 = __webpack_require__(5);
var location_1 = __webpack_require__(7);
var route_1 = __webpack_require__(22);
var RoutingParseError = (function (_super) {
    __extends(RoutingParseError, _super);
    function RoutingParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RoutingParseError;
}(errors_1.BecauseError));
var RoutingData = (function () {
    function RoutingData() {
    }
    return RoutingData;
}());
var Routing = (function () {
    function Routing(name, description, endpoint, roles, doc) {
        this.name = name;
        this.description = description;
        this.endpoint = endpoint;
        this.roles = roles;
        this.doc = doc;
    }
    return Routing;
}());
function parse_route(response) {
    var data = parse_1.parse_response(response);
    var legs = [];
    for (var _i = 0, _a = data.legs; _i < _a.length; _i++) {
        var leg_data = _a[_i];
        var steps = [];
        for (var _b = 0, _c = leg_data.steps; _b < _c.length; _b++) {
            var step_data = _c[_b];
            var points = [];
            for (var _d = 0, _e = step_data.geometry.coordinates; _d < _e.length; _d++) {
                var point_data = _e[_d];
                var point = new location_1.Point(point_data[0], point_data[1]);
                points.push(point);
            }
            var step = new route_1.Step(points, step_data.instructions, step_data.distance, step_data.duration);
            steps.push(step);
        }
        var leg = new route_1.Leg(steps, leg_data.distance, leg_data.duration);
        legs.push(leg);
    }
    var route = new route_1.Route(legs, data.distance, data.duration);
    return route;
}
exports.parse_route = parse_route;
function parse_routings(response) {
    var records = parse_1.parse_array(response);
    return records.map(function (record) {
        return new Routing(record.name, record.description, record.endpoint, record.accessList, record.apidoc);
    });
}
exports.parse_routings = parse_routings;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __webpack_require__(21);
var GeometryData = (function () {
    function GeometryData() {
    }
    return GeometryData;
}());
var Instructions = (function (_super) {
    __extends(Instructions, _super);
    function Instructions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Instructions;
}(String));
var Distance = (function (_super) {
    __extends(Distance, _super);
    function Distance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Distance;
}(Number));
var Duration = (function (_super) {
    __extends(Duration, _super);
    function Duration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Duration;
}(Number));
var StepData = (function () {
    function StepData() {
    }
    return StepData;
}());
var LegData = (function () {
    function LegData() {
    }
    return LegData;
}());
var RouteData = (function () {
    function RouteData() {
    }
    return RouteData;
}());
exports.RouteData = RouteData;
var Route = (function () {
    function Route(legs, distance, duration, points) {
        this._legs = legs;
        this.distance = distance;
        this.duration = duration;
        this._points = points || [];
    }
    Route.parse = function (response) {
        return parse_1.parse_route(response);
    };
    Object.defineProperty(Route.prototype, "legs", {
        get: function () {
            return this._legs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "steps", {
        get: function () {
            var steps = [];
            for (var _i = 0, _a = this.legs; _i < _a.length; _i++) {
                var leg = _a[_i];
                steps.push.apply(steps, leg.steps);
            }
            return steps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "points", {
        get: function () {
            var points = [];
            for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
                var step = _a[_i];
                points.push.apply(points, step.points);
            }
            return points;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "instructions", {
        get: function () {
            var lines = [];
            for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
                var step = _a[_i];
                lines.push(step.instructions);
            }
            return lines;
        },
        enumerable: true,
        configurable: true
    });
    Route.prototype.progress = function (leg, step, point) {
        leg = leg || 0;
        step = step || 0;
        point = point || 0;
    };
    return Route;
}());
exports.Route = Route;
var Leg = (function () {
    function Leg(steps, distance, duration) {
        this._steps = steps;
        this.distance = distance;
        this.duration = duration;
    }
    Object.defineProperty(Leg.prototype, "steps", {
        get: function () {
            return this._steps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Leg.prototype, "points", {
        get: function () {
            var points = [];
            for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
                var step = _a[_i];
                points.push.apply(points, step.points);
            }
            return points;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Leg.prototype, "instructions", {
        get: function () {
            var lines = [];
            for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
                var step = _a[_i];
                lines.push(step.instructions);
            }
            return lines;
        },
        enumerable: true,
        configurable: true
    });
    return Leg;
}());
exports.Leg = Leg;
var Step = (function () {
    function Step(points, instructions, distance, duration) {
        this._points = points;
        this.instructions = instructions;
        this.distance = distance;
        this.duration = duration;
    }
    Object.defineProperty(Step.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    return Step;
}());
exports.Step = Step;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __webpack_require__(27);
var transfer_1 = __webpack_require__(49);
var xhr_1 = __webpack_require__(50);
var BrowserTransfer = (function (_super) {
    __extends(BrowserTransfer, _super);
    function BrowserTransfer(request, timeout) {
        var _this = _super.call(this, request) || this;
        _this.timeout = timeout || 0;
        _this.xhr = _this.new_xhr();
        return _this;
    }
    BrowserTransfer.prototype.new_xhr = function () {
        var _this = this;
        var xhr = new xhr_1.XHR(this.timeout || 0);
        var listen = function (name, bindable) {
            var bound = bindable.bind(_this);
            xhr.listen(name, bound);
        };
        listen("loadstart", this.on_loadstart);
        listen("progress", this.on_progress);
        listen("load", this.on_load);
        listen("loadend", this.on_loadend);
        listen("abort", this.on_abort);
        listen("error", this.on_error);
        listen("timeout", this.on_timeout);
        return xhr;
    };
    BrowserTransfer.prototype.finish = function (cause) {
        _super.prototype.finish.call(this, cause);
    };
    BrowserTransfer.prototype.promise = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = (this.request.headers
                            ? this.request.headers.pairs()
                            : []);
                        this.started = true;
                        body = this.request.body || "";
                        this.xhr.start(this.request.method, this.request.url, headers, body);
                        return [4, this.xhr.promise()];
                    case 1:
                        _a.sent();
                        return [2, this.response];
                }
            });
        });
    };
    Object.defineProperty(BrowserTransfer.prototype, "response", {
        get: function () {
            return this.xhr.response;
        },
        enumerable: true,
        configurable: true
    });
    BrowserTransfer.prototype.abort = function () {
        if (this.xhr) {
            this.xhr.abort();
        }
        this.aborted = true;
    };
    BrowserTransfer.prototype.on_loadstart = function (ev) {
        this.receive_progress.update_from_event(ev);
    };
    BrowserTransfer.prototype.on_progress = function (ev) {
        this.receive_progress.update_from_event(ev);
    };
    BrowserTransfer.prototype.on_load = function (ev) {
        this.finish("load");
    };
    BrowserTransfer.prototype.on_loadend = function (ev) {
        this.receive_progress.update_from_event(ev);
        this.finish("loadend");
    };
    BrowserTransfer.prototype.on_abort = function (ev) {
        this.finish("abort");
    };
    BrowserTransfer.prototype.on_error = function (ev) {
        this.error = ev;
        this.finish("error");
    };
    BrowserTransfer.prototype.on_timeout = function (ev) {
        this.finish("timeout");
        this.receive_progress.update_from_event(ev);
    };
    return BrowserTransfer;
}(transfer_1.TransferBase));
exports.BrowserTransfer = BrowserTransfer;
var BrowserClient = (function (_super) {
    __extends(BrowserClient, _super);
    function BrowserClient() {
        return _super.call(this, BrowserTransfer) || this;
    }
    return BrowserClient;
}(client_1.ClientBase));
exports.BrowserClient = BrowserClient;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __webpack_require__(4);
var log_1 = __webpack_require__(8);
var errors_1 = __webpack_require__(0);
var host_1 = __webpack_require__(16);
var request_1 = __webpack_require__(17);
var query_1 = __webpack_require__(3);
var headers_1 = __webpack_require__(2);
var frontend_1 = __webpack_require__(15);
var frontend_2 = __webpack_require__(12);
var frontend_3 = __webpack_require__(13);
var frontend_4 = __webpack_require__(10);
var frontend_5 = __webpack_require__(11);
var frontend_6 = __webpack_require__(14);
var Frontend = (function () {
    function Frontend(classes, client, host, debug) {
        this.classes = classes;
        this.client = client;
        this.host = host;
        this.debug = debug;
        this.default_headers = new headers_1.Headers({
            "Accept": "application/json",
            "X-Api-Version": "0.1",
        });
        if (!classes) {
            throw new errors_1.InvalidObject("must pass an object mapping frontend classes");
        }
        if (!client) {
            throw new errors_1.InvalidObject("must pass a client");
        }
        if (!host || !(host instanceof host_1.Host)) {
            throw new errors_1.InvalidObject("must pass a Host instance");
        }
        this.client = client;
        this.host = host;
        this.debug = debug || false;
        this.jwt = undefined;
        this.key = undefined;
        this.log = new log_1.Log("because");
        this.tokens = new frontend_1.TokenFrontend(this, host);
        this.keys = new frontend_2.KeyFrontend(this, host);
        this.add_service_frontends(classes);
    }
    Frontend.prototype.add_service_frontends = function (classes) {
        for (var _i = 0, _a = data_1.pairs(classes); _i < _a.length; _i++) {
            var pair = _a[_i];
            var cls = pair[1];
            var frontend = new cls(this, this.host);
            this.add_service_frontend(frontend);
        }
    };
    Frontend.prototype.add_service_frontend = function (frontend) {
        if (frontend instanceof frontend_1.TokenFrontend) {
            this.tokens = frontend;
        }
        else if (frontend instanceof frontend_2.KeyFrontend) {
            this.keys = frontend;
        }
        else if (frontend instanceof frontend_4.BasemapFrontend) {
            this.basemaps = frontend;
        }
        else if (frontend instanceof frontend_5.GeocodingFrontend) {
            this.geocoding = frontend;
        }
        else if (frontend instanceof frontend_3.RoutingFrontend) {
            this.routing = frontend;
        }
        else if (frontend instanceof frontend_6.SearchFrontend) {
            this.search = frontend;
        }
    };
    Frontend.prototype.request = function (method, uri, query, body, headers) {
        headers = this.enriched_headers(headers);
        query = this.enriched_query(query);
        var url = this.host.url + "/" + uri;
        return new request_1.Request(method, url, query, body, headers);
    };
    Frontend.prototype.enriched_headers = function (headers) {
        var enriched = (headers
            ? headers.updated(this.default_headers)
            : this.default_headers.copy());
        if (this.jwt) {
            enriched.set("Authorization", "Bearer " + this.jwt.token);
        }
        return enriched;
    };
    Frontend.prototype.enriched_query = function (query) {
        var enriched = (query
            ? query
            : new query_1.Query());
        if (this.key) {
            enriched.set("apikey", this.key.key);
        }
        return enriched;
    };
    Frontend.prototype.login = function (username, password, key) {
        return __awaiter(this, void 0, void 0, function () {
            var frontend, keyfrontend, jwt, keyval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frontend = this.tokens;
                        keyfrontend = this.keys;
                        if (!(username != undefined && password != undefined)) return [3, 4];
                        if (!frontend) return [3, 2];
                        return [4, frontend.get_token(username, password)];
                    case 1:
                        jwt = _a.sent();
                        this.jwt = jwt;
                        return [3, 3];
                    case 2:
                        this.log.error("cannot login without token service loaded");
                        _a.label = 3;
                    case 3: return [2, jwt];
                    case 4:
                        if (!(key != undefined)) return [3, 6];
                        return [4, keyfrontend.validate_key(key)];
                    case 5:
                        keyval = _a.sent();
                        this.log.debug("keyval", keyval);
                        this.key = keyval;
                        return [2, keyval];
                    case 6:
                        this.log.error("Login requires either username and password or a key");
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    Frontend.prototype.send = function (request) {
        var headers = this.enriched_headers(request.headers);
        var query = this.enriched_query(request.query);
        request.headers = headers;
        request.query = query;
        this.log.debug("about to send", { "enriched query": query });
        this.log.debug("about to send", { "request": request });
        var transfer = this.client.send(request);
        return transfer;
    };
    return Frontend;
}());
exports.Frontend = Frontend;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var host_1 = __webpack_require__(16);
exports.Host = host_1.Host;
exports.urls = {
    "dev": "https://saasy.boundlessgeo.io",
    "test": "https://saasy.boundlessgeo.io",
    "prod": "https://saasy.boundlessgeo.io",
    "local": "http://localhost:8000",
};
exports.hosts = {
    "dev": new host_1.Host(exports.urls.dev),
    "test": new host_1.Host(exports.urls.test),
    "prod": new host_1.Host(exports.urls.prod),
    "local": new host_1.Host(exports.urls.local),
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var frontend_1 = __webpack_require__(24);
var hosts_1 = __webpack_require__(25);
var browser_es5_1 = __webpack_require__(23);
var frontend_2 = __webpack_require__(15);
var frontend_3 = __webpack_require__(12);
var frontend_4 = __webpack_require__(13);
var frontend_5 = __webpack_require__(10);
var frontend_6 = __webpack_require__(11);
var frontend_7 = __webpack_require__(14);
var Because = (function (_super) {
    __extends(Because, _super);
    function Because(env, debug) {
        var _this = this;
        env = env || "test";
        var host = hosts_1.hosts[env];
        if (!host) {
            throw new Error("unknown environment '" + env + "'");
        }
        if (!host.url) {
            throw new Error("bad host for '" + env + "'");
        }
        var classes = {
            "tokens": frontend_2.TokenFrontend,
            "keys": frontend_3.KeyFrontend,
            "routing": frontend_4.RoutingFrontend,
            "geocode": frontend_6.GeocodingFrontend,
            "basemap": frontend_5.BasemapFrontend,
            "search": frontend_7.SearchFrontend,
        };
        _this = _super.call(this, classes, new browser_es5_1.BrowserClient(), host, debug) || this;
        return _this;
    }
    return Because;
}(frontend_1.Frontend));
exports.Because = Because;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientBase = (function () {
    function ClientBase(Transfer) {
        this.Transfer = Transfer;
    }
    ClientBase.prototype.transfer = function (request) {
        var transfer = new this.Transfer(request);
        return transfer;
    };
    ClientBase.prototype.send = function (request) {
        var transfer = this.transfer(request);
        transfer.start();
        return transfer;
    };
    return ClientBase;
}());
exports.ClientBase = ClientBase;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var REGEX = /{(.+?)}/g;
function format(template, data) {
    return template.replace(REGEX, function (match, value) {
        return (data ? data[value] : undefined) || "";
    });
}
exports.format = format;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProgressEventInterface = (function () {
    function ProgressEventInterface() {
    }
    return ProgressEventInterface;
}());
exports.ProgressEventInterface = ProgressEventInterface;
var Progress = (function () {
    function Progress(done, total) {
        this._done = (typeof done === "undefined" ? NaN : done);
        this._total = (typeof total === "undefined" ? NaN : total);
    }
    Object.defineProperty(Progress.prototype, "done", {
        get: function () {
            return this._done;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "total", {
        get: function () {
            return this._total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "left", {
        get: function () {
            if (isNaN(this.total)) {
                return NaN;
            }
            return this.total - this.done;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "percent", {
        get: function () {
            if (isNaN(this.done) || isNaN(this.total) || this.total === 0) {
                return NaN;
            }
            var cent = 100.0;
            return (this.done / this.total) * cent;
        },
        enumerable: true,
        configurable: true
    });
    Progress.prototype.update_from_event = function (ev) {
        this._done = ev.loaded;
        this._total = ev.total;
    };
    return Progress;
}());
exports.Progress = Progress;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BasemapData = (function () {
    function BasemapData() {
    }
    return BasemapData;
}());
exports.BasemapData = BasemapData;
var Basemap = (function () {
    function Basemap(endpoint, standard, tile_format, title, provider, attribution, access_list, description, thumbnail, style_url) {
        this.endpoint = endpoint;
        this.standard = standard;
        this.tile_format = tile_format;
        this.title = title;
        this.provider = provider;
        this.attribution = attribution;
        this.access_list = access_list;
        this.description = description;
        this.thumbnail = thumbnail;
        this.style_url = style_url;
    }
    return Basemap;
}());
exports.Basemap = Basemap;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
exports.endpoints = {
    "basemaps": new service_1.Endpoint("GET", "/basemaps/"),
    "providers": new service_1.Endpoint("GET", "/basemaps/providers"),
    "provider": new service_1.Endpoint("GET", "/basemaps/providers/{provider}"),
    "manage": new service_1.Endpoint("GET", "/basemaps/manage"),
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var parse_1 = __webpack_require__(5);
var basemap_1 = __webpack_require__(30);
var BasemapParseError = (function (_super) {
    __extends(BasemapParseError, _super);
    function BasemapParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasemapParseError;
}(errors_1.BecauseError));
function parse_basemaps(response) {
    var records = parse_1.parse_array(response);
    return records.map(function (record) {
        return new basemap_1.Basemap(record.endpoint, record.standard, record.tileFormat, record.name, record.provider, record.attribution, record.accessList, record.description, record.thumbnail, record.styleUrl);
    });
}
exports.parse_basemaps = parse_basemaps;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var endpoints_1 = __webpack_require__(31);
var BasemapService = (function (_super) {
    __extends(BasemapService, _super);
    function BasemapService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    BasemapService.prototype.parse = function (response) {
    };
    return BasemapService;
}(service_1.Service));
exports.BasemapService = BasemapService;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
exports.endpoints = {
    "metadata": new service_1.Endpoint("GET", "/geocodings"),
    "forward": new service_1.Endpoint("GET", "/geocode/{provider}/address/{address}"),
    "reverse": new service_1.Endpoint("GET", "/geocode/{provider}/address/x/{x}/y/{y}"),
    "batch": new service_1.Endpoint("GET", "/geocode/{provider}/batch"),
    "manage": new service_1.Endpoint("GET", "/geocode/manage"),
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var geocode_1 = __webpack_require__(19);
var endpoints_1 = __webpack_require__(34);
var GeocodingService = (function (_super) {
    __extends(GeocodingService, _super);
    function GeocodingService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    GeocodingService.prototype.parse = function (response) {
        return geocode_1.Geocode.parse(response);
    };
    return GeocodingService;
}(service_1.Service));
exports.GeocodingService = GeocodingService;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(3);
var headers_1 = __webpack_require__(2);
var service_1 = __webpack_require__(1);
exports.endpoints = {
    "validate_key": new service_1.Endpoint("GET", "/auth/validate/key/{key}", function (args) {
        return new query_1.Query({
            "apikey": args.key.toString()
        });
    }),
    "create_key": new service_1.Endpoint("POST", "/auth/admin/create-apikey", undefined, new headers_1.Headers({
        "Content-Type": "application/json",
    }), function (args) {
        return JSON.stringify({
            "organizationId": args.organizationId,
            "expireQuantity": args.expireQuantity,
            "expireUnit": args.expireUnit,
            "roles": args.roles.toString().split(',')
        });
    }),
    "update_key": new service_1.Endpoint("POST", "/auth/admin/update-apikey", undefined, undefined, function (args) {
        return JSON.stringify({
            "id": args.id,
            "expireQuantity": args.expireQuantity,
            "roles": args.roles,
            "expireUnit": args.expireUnit
        });
    }),
    "get_organizations": new service_1.Endpoint("GET", "/auth/admin/get-organizations"),
    "get_organization_byid": new service_1.Endpoint("GET", "/auth/admin/get-organization-by-name/{name}"),
    "delete_organization_byid": new service_1.Endpoint("GET", "/auth/admin/delete-organization-by-id/{id}"),
    "update_organization": new service_1.Endpoint("POST", "/auth/admin/update-organization", undefined, undefined, function (args) {
        return JSON.stringify({
            "id": args.id,
            "name": args.name
        });
    }),
    "get_roles": new service_1.Endpoint("GET", "/auth/admin/get-roles")
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __webpack_require__(5);
var KeyValidateData = (function () {
    function KeyValidateData(organization, key, roles, errorCode, errorMessage) {
        this.organization = organization;
        this.key = key;
        this.roles = roles;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return KeyValidateData;
}());
exports.KeyValidateData = KeyValidateData;
var UserRole = (function () {
    function UserRole(id, key, description) {
        this.id = id;
        this.key = key;
        this.description = description;
    }
    return UserRole;
}());
exports.UserRole = UserRole;
var ApiKey = (function () {
    function ApiKey(id, key, created, expires, authorizedRoles, parentOrganizationId, errorCode, errorMessage) {
        this.id = id;
        this.key = key;
        this.created = created;
        this.expires = expires;
        this.authorizedRoles = authorizedRoles;
        this.parentOrganizationId = parentOrganizationId;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return ApiKey;
}());
exports.ApiKey = ApiKey;
var User = (function () {
    function User(id, email, roles, created, parentOrganizationId) {
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.created = created;
        this.parentOrganizationId = parentOrganizationId;
    }
    return User;
}());
exports.User = User;
var Organization = (function () {
    function Organization(id, name, created, members, administrators, apiKeys, errorCode, errorMessage) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.members = members;
        this.administrators = administrators;
        this.apiKeys = apiKeys;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return Organization;
}());
exports.Organization = Organization;
var WrappedOrganization = (function () {
    function WrappedOrganization(value, errorCode, errorMessage) {
        this.value = value;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return WrappedOrganization;
}());
exports.WrappedOrganization = WrappedOrganization;
var WrappedOrganizations = (function () {
    function WrappedOrganizations(value, errorCode, errorMessage) {
        this.value = value;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return WrappedOrganizations;
}());
exports.WrappedOrganizations = WrappedOrganizations;
var WrappedRoles = (function () {
    function WrappedRoles(value, errorCode, errorMessage) {
        this.value = value;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return WrappedRoles;
}());
exports.WrappedRoles = WrappedRoles;
var WrappedKey = (function () {
    function WrappedKey(value, errorCode, errorMessage) {
        this.value = value;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    return WrappedKey;
}());
exports.WrappedKey = WrappedKey;
function parse_wrapped_key(response) {
    var data = parse_1.parse_response(response);
    var roles = [];
    for (var _i = 0, _a = data.value.authorizedRoles; _i < _a.length; _i++) {
        var role_data = _a[_i];
        var role = new UserRole(role_data.id, role_data.key, role_data.description);
        roles.push(role);
    }
    return new ApiKey(data.value.id, data.value.key, data.value.created, data.value.expires, roles, data.value.parentOrganizationId, data.errorCode, data.errorMessage);
}
exports.parse_wrapped_key = parse_wrapped_key;
function parse_key_validate(response) {
    var data = parse_1.parse_response(response);
    return new KeyValidateData(data.organization, data.key, data.roles, data.errorCode, data.errorMessage);
}
exports.parse_key_validate = parse_key_validate;
function parse_ApiKey(response) {
    var data = parse_1.parse_response(response);
    var roles = [];
    for (var _i = 0, _a = data.authorizedRoles; _i < _a.length; _i++) {
        var role_data = _a[_i];
        var role = new UserRole(role_data.id, role_data.key, role_data.description);
        roles.push(role);
    }
    return new ApiKey(data.id, data.key, data.created, data.expires, roles, data.parentOrganizationId, data.errorCode, data.errorMessage);
}
exports.parse_ApiKey = parse_ApiKey;
function parse_Organization(response) {
    var data = parse_1.parse_response(response);
    var members = [];
    for (var _i = 0, _a = data.members; _i < _a.length; _i++) {
        var memberdata = _a[_i];
        var memberroles = [];
        for (var _b = 0, _c = memberdata.roles; _b < _c.length; _b++) {
            var memberrole = _c[_b];
            var role = new UserRole(memberrole.id, memberrole.key, memberrole.description);
            memberroles.push(role);
        }
        var member = new User(memberdata.id, memberdata.email, memberroles, memberdata.created, memberdata.parentOrganizationId);
        members.push(member);
    }
    var administrators = [];
    for (var _d = 0, _e = data.administrators; _d < _e.length; _d++) {
        var administordata = _e[_d];
        var adminroles = [];
        for (var _f = 0, _g = administordata.roles; _f < _g.length; _f++) {
            var adminrole = _g[_f];
            var role = new UserRole(adminrole.id, adminrole.key, adminrole.description);
            adminroles.push(role);
        }
        var administrator = new User(administordata.id, administordata.email, adminroles, administordata.created, administordata.parentOrganizationId);
        administrators.push(administrator);
    }
    var apiKeys = [];
    for (var _h = 0, _j = data.apiKeys; _h < _j.length; _h++) {
        var apikeydata = _j[_h];
        var roles = [];
        for (var _k = 0, _l = apikeydata.authorizedRoles; _k < _l.length; _k++) {
            var role_data = _l[_k];
            var role = new UserRole(role_data.id, role_data.key, role_data.description);
            roles.push(role);
        }
        var key = new ApiKey(apikeydata.id, apikeydata.key, apikeydata.created, apikeydata.expires, roles, apikeydata.parentOrganizationId, apikeydata.errorCode, apikeydata.errorMessage);
        apiKeys.push(key);
    }
    return new Organization(data.id, data.name, data.created, members, administrators, apiKeys, data.errorCode, data.errorMessage);
}
exports.parse_Organization = parse_Organization;
function parse_roles(response) {
    var records = parse_1.parse_response(response);
    return records.value.map(function (data) {
        return new UserRole(data.id, data.key, data.description);
    });
}
exports.parse_roles = parse_roles;
function parse_Organizations(response) {
    var records = parse_1.parse_response(response);
    return records.value.map(function (data) {
        var members = [];
        for (var _i = 0, _a = data.members; _i < _a.length; _i++) {
            var memberdata = _a[_i];
            var memberroles = [];
            for (var _b = 0, _c = memberdata.roles; _b < _c.length; _b++) {
                var memberrole = _c[_b];
                var role = new UserRole(memberrole.id, memberrole.key, memberrole.description);
                memberroles.push(role);
            }
            var member = new User(memberdata.id, memberdata.email, memberroles, memberdata.created, memberdata.parentOrganizationId);
            members.push(member);
        }
        var administrators = [];
        for (var _d = 0, _e = data.administrators; _d < _e.length; _d++) {
            var administordata = _e[_d];
            var adminroles = [];
            for (var _f = 0, _g = administordata.roles; _f < _g.length; _f++) {
                var adminrole = _g[_f];
                var role = new UserRole(adminrole.id, adminrole.key, adminrole.description);
                adminroles.push(role);
            }
            var administrator = new User(administordata.id, administordata.email, adminroles, administordata.created, administordata.parentOrganizationId);
            administrators.push(administrator);
        }
        var apiKeys = [];
        for (var _h = 0, _j = data.apiKeys; _h < _j.length; _h++) {
            var apikeydata = _j[_h];
            var roles = [];
            for (var _k = 0, _l = apikeydata.authorizedRoles; _k < _l.length; _k++) {
                var role_data = _l[_k];
                var role = new UserRole(role_data.id, role_data.key, role_data.description);
                roles.push(role);
            }
            var key = new ApiKey(apikeydata.id, apikeydata.key, apikeydata.created, apikeydata.expires, roles, apikeydata.parentOrganizationId, apikeydata.errorCode, apikeydata.errorMessage);
            apiKeys.push(key);
        }
        return new Organization(data.id, data.name, data.created, members, administrators, apiKeys, data.errorCode, data.errorMessage);
    });
}
exports.parse_Organizations = parse_Organizations;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var endpoints_1 = __webpack_require__(36);
var KeyService = (function (_super) {
    __extends(KeyService, _super);
    function KeyService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    KeyService.prototype.parse = function (response) {
    };
    return KeyService;
}(service_1.Service));
exports.KeyService = KeyService;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var query_1 = __webpack_require__(3);
exports.endpoints = {
    "metadata": new service_1.Endpoint("GET", "/routings/"),
    "geocoded": new service_1.Endpoint("GET", "/route/{provider}\
        /originx/{originx}\
        /originy/{originy}\
        /destinationx/{destinationx}\
        /destinationy/{destinationy}"),
    "address": new service_1.Endpoint("GET", "/route/{provider}/\
        originaddress/{originaddress}\
        /destinationaddress/{destinationaddress}"),
    "waypoints": new service_1.Endpoint("GET", "/route/{provider}/", function (args) {
        var provider = args.provider.toString();
        var waypoints = args.waypoints.toString();
        return new query_1.Query({
            "provider": provider,
            "waypoints": waypoints,
        });
    }),
    "batch": new service_1.Endpoint("GET", "/route/mapbox/batch"),
    "isochrone": new service_1.Endpoint("GET", "/route/{provider}/isochrone", function (args) {
        return new query_1.Query({
            "provider": args.provider.toString(),
            "centerx": args.longitude.toString(),
            "centery": args.latitude.toString(),
            "time": args.time.toString(),
            "resolution": args.resolution.toString(),
            "maxspeed": args.maxspeed.toString(),
        });
    }),
    "isochrone_status": new service_1.Endpoint("GET", "/route/{provider}/isochrone/{jobid}"),
    "manage": new service_1.Endpoint("GET", "/route/manage"),
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var endpoints_1 = __webpack_require__(39);
var RoutingService = (function (_super) {
    __extends(RoutingService, _super);
    function RoutingService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    return RoutingService;
}(service_1.Service));
exports.RoutingService = RoutingService;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(3);
var service_1 = __webpack_require__(1);
var SearchArgs = (function () {
    function SearchArgs() {
    }
    return SearchArgs;
}());
exports.endpoints = {
    "search": new service_1.Endpoint("GET", "/search/", function (args) {
        return new query_1.Query({
            "q": (args.text || "").toString(),
            "cat": (args.cat || "ALL").toString(),
            "c": (args.results_per_page || 20).toString(),
            "si": (args.starting_page || 0).toString(),
        });
    }),
    "search_open": new service_1.Endpoint("GET", "/search/open", function (args) {
        return new query_1.Query({
            "q": (args.text || "").toString(),
            "cat": (args.cat || "ALL").toString(),
            "c": (args.results_per_page || 20).toString(),
            "si": (args.starting_page || 0).toString(),
        });
    }),
    "search_data": new service_1.Endpoint("GET", "/search/data/", function (args) {
        return new query_1.Query({
            "startPeriod": args.start.toString(),
            "endPeriod": args.end.toString(),
            "searchBounds": args.bounds.toString(),
            "terms": args.terms.toString(),
        });
    }),
    "categories": new service_1.Endpoint("GET", "/search/categories/"),
    "search_in_category": new service_1.Endpoint("GET", "/search/categories/{category}", function (args) {
        var q = args.q;
        if (typeof q === "number") {
            q = "";
        }
        return new query_1.Query({
            "q": q,
        });
    }),
    "manage": new service_1.Endpoint("GET", "/search/manage"),
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __webpack_require__(5);
var search_result_1 = __webpack_require__(43);
function parse_search_results(response) {
    var result = parse_1.parse_response(response);
    return result.features.map(function (feature) {
        return new search_result_1.SearchResult(feature.properties.title, feature.properties.url, feature.properties.id, feature.properties.role, feature.properties.category, feature.properties.description, feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
    });
}
exports.parse_search_results = parse_search_results;
function parse_search_categories(response) {
    var results = parse_1.parse_array(response);
    return results.map(function (result) {
        return result;
    });
}
exports.parse_search_categories = parse_search_categories;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = __webpack_require__(7);
var SearchResultEnvelope = (function () {
    function SearchResultEnvelope() {
    }
    return SearchResultEnvelope;
}());
exports.SearchResultEnvelope = SearchResultEnvelope;
var GeometryData = (function () {
    function GeometryData() {
    }
    return GeometryData;
}());
var PropertiesData = (function () {
    function PropertiesData() {
    }
    return PropertiesData;
}());
var SearchResultData = (function () {
    function SearchResultData() {
    }
    return SearchResultData;
}());
exports.SearchResultData = SearchResultData;
var SearchResult = (function (_super) {
    __extends(SearchResult, _super);
    function SearchResult(title, url, id, role, category, description, x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.title = title;
        _this.url = url;
        _this.id = id;
        _this.role = role;
        _this.category = category;
        _this.description = description;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    return SearchResult;
}(location_1.Point));
exports.SearchResult = SearchResult;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var endpoints_1 = __webpack_require__(41);
var SearchService = (function (_super) {
    __extends(SearchService, _super);
    function SearchService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    return SearchService;
}(service_1.Service));
exports.SearchService = SearchService;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(3);
var headers_1 = __webpack_require__(2);
var service_1 = __webpack_require__(1);
exports.endpoints = {
    "get_token": new service_1.Endpoint("POST", "/token/", new query_1.Query(), new headers_1.Headers({
        "Content-Type": "application/json",
    }), function (args) {
        return JSON.stringify({
            "username": args.username.toString(),
            "password": args.password.toString(),
        });
    }),
    "get_oauth_token": new service_1.Endpoint("POST", "/token/oauth", undefined, undefined, function (args) {
        return JSON.stringify({
            "grant_type": "password",
            "username": args.username,
            "password": args.password,
        });
    }),
    "get_roles": new service_1.Endpoint("GET", "/token/entitlements"),
    "get_apikey": new service_1.Endpoint("GET", "/token/apikey"),
    "manage": new service_1.Endpoint("GET", "/token/manage"),
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JWT = (function () {
    function JWT(name, email, email_verified, roles, issuer, subject, audience, expiration, issued_at, token) {
        this.name = name;
        this.email = email;
        this.email_verified = email_verified;
        this.roles = roles;
        this.issuer = issuer;
        this.subject = subject;
        this.audience = audience;
        this.expiration = expiration;
        this.issued_at = issued_at;
        this.token = token;
    }
    return JWT;
}());
exports.JWT = JWT;
var LazyJWT = (function () {
    function LazyJWT(data) {
        this.data = data;
    }
    Object.defineProperty(LazyJWT.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "email", {
        get: function () {
            return this.data.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "email_verified", {
        get: function () {
            return this.data.email_verified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "roles", {
        get: function () {
            var roles = this.data.app_metadata.SiteRole.split(",");
            roles.sort();
            return roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "issuer", {
        get: function () {
            return this.data.iss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "subject", {
        get: function () {
            return this.data.sub;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "audience", {
        get: function () {
            return this.data.aud;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "expiration", {
        get: function () {
            return new Date(this.data.exp * 1000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "issued_at", {
        get: function () {
            return new Date(this.data.iat * 1000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyJWT.prototype, "token", {
        get: function () {
            return this.data.token || "";
        },
        enumerable: true,
        configurable: true
    });
    return LazyJWT;
}());
exports.LazyJWT = LazyJWT;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var parse_1 = __webpack_require__(5);
var jwt_1 = __webpack_require__(46);
var TokenParseError = (function (_super) {
    __extends(TokenParseError, _super);
    function TokenParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TokenParseError;
}(errors_1.BecauseError));
var ApiKeyData = (function () {
    function ApiKeyData() {
    }
    return ApiKeyData;
}());
var OAuthTokenData = (function () {
    function OAuthTokenData() {
    }
    return OAuthTokenData;
}());
var TokenRequest = (function () {
    function TokenRequest() {
    }
    return TokenRequest;
}());
var TokenData = (function () {
    function TokenData() {
    }
    return TokenData;
}());
exports.TokenData = TokenData;
var AppMetadata = (function () {
    function AppMetadata() {
    }
    return AppMetadata;
}());
exports.AppMetadata = AppMetadata;
var JWTData = (function () {
    function JWTData() {
    }
    return JWTData;
}());
exports.JWTData = JWTData;
function response_to_blob(response) {
    var data = parse_1.parse_response(response);
    if (!data.token) {
        throw new Error("no token blob");
    }
    return data.token;
}
exports.response_to_blob = response_to_blob;
function blob_to_data(blob) {
    if (!blob) {
        throw new Error("empty token blob");
    }
    var parts = blob.split(".");
    if (parts.length !== 3) {
        throw new Error("cannot parse token blob into parts");
    }
    var middle = parts[1];
    var payload = window.atob(middle);
    var parsed = JSON.parse(payload);
    return parsed;
}
exports.blob_to_data = blob_to_data;
function response_to_data(response) {
    var blob = response_to_blob(response);
    var data = blob_to_data(blob);
    return __assign({}, data, { "token": data.token || "" });
}
exports.response_to_data = response_to_data;
function response_to_jwt(response) {
    var blob = response_to_blob(response);
    var data = blob_to_data(blob);
    var lazy = new jwt_1.LazyJWT(data);
    return new jwt_1.JWT(lazy.name, lazy.email, lazy.email_verified, lazy.roles, lazy.issuer, lazy.subject, lazy.audience, lazy.expiration, lazy.issued_at, blob);
}
exports.response_to_jwt = response_to_jwt;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __webpack_require__(1);
var endpoints_1 = __webpack_require__(45);
var TokenService = (function (_super) {
    __extends(TokenService, _super);
    function TokenService() {
        return _super.call(this, endpoints_1.endpoints) || this;
    }
    TokenService.prototype.parse = function (response) {
    };
    return TokenService;
}(service_1.Service));
exports.TokenService = TokenService;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = __webpack_require__(18);
var progress_1 = __webpack_require__(29);
var TransferBase = (function () {
    function TransferBase(request, timeout) {
        this.request = request;
        this.timeout = timeout || 0;
        this._cause = "";
        this.send_progress = new progress_1.Progress();
        this.receive_progress = new progress_1.Progress();
        this.started = false;
        this.aborted = false;
        this.finished = false;
    }
    TransferBase.prototype.start = function () {
        if (!this.started) {
            this.started = true;
        }
    };
    TransferBase.prototype.finish = function (cause) {
        if (!this.finished) {
            this._cause = cause;
            this.finished = true;
        }
    };
    TransferBase.prototype.promise = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolved;
            return __generator(this, function (_a) {
                this.start();
                resolved = Promise.resolve(new response_1.Response(0));
                return [2, resolved];
            });
        });
    };
    TransferBase.prototype.then = function (on_fulfill, on_reject) {
        var promise1 = this.promise();
        var promise2 = promise1.then(on_fulfill, on_reject);
        return promise2;
    };
    TransferBase.prototype.catch = function (on_reject) {
        return this.promise().catch(on_reject);
    };
    TransferBase.prototype.abort = function () {
        this.aborted = true;
    };
    Object.defineProperty(TransferBase.prototype, "cause", {
        get: function () {
            return this._cause;
        },
        enumerable: true,
        configurable: true
    });
    return TransferBase;
}());
exports.TransferBase = TransferBase;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(0);
var response_1 = __webpack_require__(18);
var headers_1 = __webpack_require__(2);
var XHRError = (function (_super) {
    __extends(XHRError, _super);
    function XHRError(message, ev, text) {
        var _this = _super.call(this, message, text || message) || this;
        _this.event = ev;
        return _this;
    }
    return XHRError;
}(errors_1.BecauseError));
function xhr_to_response(xhr) {
    var will_parse_headers = function () {
        var blob = xhr.getAllResponseHeaders();
        return headers_1.Headers.parse(blob);
    };
    var response = new response_1.Response(xhr.status, will_parse_headers, xhr.responseText);
    return response;
}
function xhr_to_promise(xhr) {
    return __awaiter(this, void 0, void 0, function () {
        var finished;
        return __generator(this, function (_a) {
            finished = 4;
            if (xhr.readyState === finished) {
                return [2, Promise.resolve(xhr)];
            }
            return [2, new Promise(function (resolve, reject) {
                    var flags = { "done": false };
                    function succeed(ev) {
                        if (!flags.done) {
                            flags.done = true;
                            resolve(xhr);
                        }
                    }
                    var fail = function (ev) {
                        if (!flags.done) {
                            flags.done = true;
                            var error = new XHRError("XHR failed", ev);
                            reject(error);
                        }
                    };
                    xhr.addEventListener("load", succeed);
                    xhr.addEventListener("error", fail);
                    xhr.addEventListener("abort", fail);
                    xhr.addEventListener("timeout", fail);
                    xhr.addEventListener("loadend", fail);
                })];
        });
    });
}
function xhr_start(xhr, method, url, headers, body) {
    xhr.open(method, url, true);
    if (headers) {
        for (var _i = 0, headers_2 = headers; _i < headers_2.length; _i++) {
            var pair = headers_2[_i];
            var key = pair[0], value = pair[1];
            xhr.setRequestHeader(key, value);
        }
    }
    xhr.send(body || "");
}
var XHR = (function () {
    function XHR(timeout) {
        if (timeout === void 0) { timeout = 0; }
        this.xhr = new XMLHttpRequest();
        this.timeout = timeout;
    }
    XHR.prototype.listen = function (name, callback) {
        this.xhr.addEventListener(name, callback);
    };
    XHR.prototype.start = function (method, url, headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                xhr_start(this.xhr, method, url, headers, body || "");
                return [2, this.promise()];
            });
        });
    };
    XHR.prototype.promise = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, xhr_to_promise(this.xhr)];
                    case 1:
                        _a.sent();
                        return [2, this];
                }
            });
        });
    };
    Object.defineProperty(XHR.prototype, "response", {
        get: function () {
            if (!this._response) {
                this._response = xhr_to_response(this.xhr);
            }
            return this._response;
        },
        enumerable: true,
        configurable: true
    });
    XHR.prototype.abort = function () {
        this.xhr.abort();
    };
    return XHR;
}());
exports.XHR = XHR;


/***/ })
/******/ ]);
});
//# sourceMappingURL=because.js.map