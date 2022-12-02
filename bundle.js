(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.lib = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        reverse: function() {
            return reverse;
        },
        promise: function() {
            return promise;
        }
    });
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self1 = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self1, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    var __generator = (void 0) && (void 0).__generator || function(thisArg, body) {
        var f, y, t, g, _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        };
        return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([
                    n,
                    v
                ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while(_)try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [
                    op[0] & 2,
                    t.value
                ];
                switch(op[0]){
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [
                            0
                        ];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [
                    6,
                    e
                ];
                y = 0;
            } finally{
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    function reverse(prepend) {
        var arr = [
            "a",
            2,
            5.4,
            prepend
        ];
        return reverseAppend(arr);
    }
    function promise() {
        return _promise.apply(this, arguments);
    }
    function _promise() {
        _promise = _asyncToGenerator(function() {
            return __generator(this, function(_state) {
                return [
                    2,
                    Promise.resolved("hello")
                ];
            });
        });
        return _promise.apply(this, arguments);
    }
});

(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("lib"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "lib"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.main = {}, global.lib);
})(this, function(exports, _lib) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally{
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function log() {
        console.log("Hello World from a JS code string!");
        console.log("Project version: ".concat(PROJECT_VERSION));
    }
    function hello() {
        var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Mathias";
        var person = new Person(name, 38);
        person.say_hello();
    }
    log();
    hello();
    // Testing some ES6 features
    // https://www.boardinfinity.com/blog/top-10-features-of-es6/
    // Array Destructuring
    var fruits = [
        "Apple",
        "Banana"
    ];
    var _fruits = _slicedToArray(fruits, 2), a = _fruits[0], b = _fruits[1]; // Array destructuring assignment
    console.log(a, b);
    // Object Destructuring
    var person = {
        name: "Peter",
        age: 28
    };
    var name = person.name, age = person.age; // Object destructuring assignment
    console.log(name, age);
    // Promise
    var asyncCall = new Promise(function(resolve) {
        resolve();
    }).then(function() {
        console.log("Promise resolved!");
    });
    // Class
    var UserProfile = /*#__PURE__*/ function() {
        "use strict";
        function UserProfile(firstName, lastName) {
            _classCallCheck(this, UserProfile);
            this.firstName = firstName;
            this.lastName = lastName;
        }
        _createClass(UserProfile, [
            {
                key: "getName",
                value: function getName() {
                    console.log("The Full-Name is ".concat(this.firstName, " ").concat(this.lastName));
                }
            }
        ]);
        return UserProfile;
    }();
    var obj = new UserProfile("John", "Smith");
    obj.getName();
    // Arrow function
    var sum = function(a, b) {
        return a + b;
    };
    sum(10, 20);
    var arr = (0, _lib.reverse)("Hello");
    console.log("Array:", arr); // Top-level await crashes
     // SWC: top level await requires target to es2017 or higher and topLevelAwait:true for ecmascript
     // async function promise() {
     //  return Promise.resolved('hello');
     // }
     // await promise();
});


//# sourceMappingURL=bundle.js.map