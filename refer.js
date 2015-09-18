(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Refer"] = factory();
	else
		root["Refer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createDispatch = __webpack_require__(1);

	var _createDispatch2 = _interopRequireDefault(_createDispatch);

	var _createStore = __webpack_require__(6);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineHandlers = __webpack_require__(2);

	var _combineHandlers2 = _interopRequireDefault(_combineHandlers);

	var _combineDispatches = __webpack_require__(5);

	var _combineDispatches2 = _interopRequireDefault(_combineDispatches);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	exports.createDispatch = _createDispatch2['default'];
	exports.createStore = _createStore2['default'];
	exports.combineHandlers = _combineHandlers2['default'];
	exports.combineDispatches = _combineDispatches2['default'];
	exports.constants = _constants2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _types = __webpack_require__(4);

	var _mapValues = __webpack_require__(7);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var createDispatche = function createDispatche(table) {
		if (!_types.isObj(table)) {
			throw new Error('createDispatche(table): Expected table to be an object which is ' + table);
		}
		var dispatch = function dispatch(_x, _x2) {
			var _again = true;

			_function: while (_again) {
				var key = _x,
				    value = _x2;
				handler = undefined;
				_again = false;

				var handler = undefined;
				switch (true) {
					case key == null:
						throw new Error('dispatch(key, value): Expected the key not to be null or undefined');
					case _types.isFn(key) || _types.isArr(key) || _types.isThenable(key) || _types.isObj(key):
						handler = key;
						break;
					default:
						handler = table[key];
				}

				switch (true) {
					case handler == null:
						return value;
					case _types.isFn(handler):
						return handler(value);
					case _types.isStr(handler) || _types.isNum(handler):
						_x = handler;
						_x2 = value;
						_again = true;
						continue _function;

					case _types.isArr(handler):
						return dispatchOnList(handler, value);
					case _types.isThenable(handler):
						return handler.then(function (asyncHandler) {
							return dispatch(asyncHandler, value);
						});
					case _types.isObj(handler):
						return _mapValues2['default'](handler, function (item) {
							return dispatch(item, value);
						});
					default:
						return value;
				}
			}
		};
		var dispatchOnList = function dispatchOnList(handlers, value) {
			for (var i = 0, len = handlers.length; i < len; i++) {
				value = dispatch(handlers[i], value);
				if (_types.isThenable(value)) {
					return i === len - 1 ? value : value.then(function (result) {
						return dispatch(handlers.slice(i + 1), result);
					});
				}
			}
			return value;
		};

		return dispatch;
	};

	exports['default'] = createDispatche;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createDispatch = __webpack_require__(1);

	var _createDispatch2 = _interopRequireDefault(_createDispatch);

	exports['default'] = function () {
		for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
			handlers[_key] = arguments[_key];
		}

		return handlers.reduce(function (rootHandler, handler) {
			var dispatch = _createDispatch2['default'](handler);
			return Object.keys(handler).reduce(function (rootHandler, key) {
				if (!rootHandler[key]) {
					rootHandler[key] = [];
				}
				rootHandler[key].push(function (value) {
					return dispatch(key, value);
				});
				return rootHandler;
			}, rootHandler);
		}, {});
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	//life cycle key
	'use strict';

	exports.__esModule = true;
	var LIFE_CYCLE = {
		DISPATCH: '@DISPATCH',
		SHOULD_DISPATCH: '@SHOULD_DISPATCH',
		WILL_UPDATE: '@WILL_UPDATE',
		SHOULD_UPDATE: '@SHOULD_UPDATE',
		DID_UPDATE: '@DID_UPDATE',
		THROW_ERROR: '@THROW_ERROR',
		ASYNC_START: '@ASYNC_START',
		ASYNC_END: '@ASYNC_END',
		SYNC: '@SYNC'
	};

	exports['default'] = LIFE_CYCLE;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	//types.js
	'use strict';

	exports.__esModule = true;
	var isType = function isType(type) {
	  return function (obj) {
	    return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
	  };
	};
	exports.isType = isType;
	var isObj = isType('Object');
	exports.isObj = isObj;
	var isStr = isType('String');
	exports.isStr = isStr;
	var isNum = isType('Number');
	exports.isNum = isNum;
	var isFn = isType('Function');
	exports.isFn = isFn;
	var isArr = Array.isArray || isType('Array');
	exports.isArr = isArr;
	var isThenable = function isThenable(obj) {
	  return obj != null && isFn(obj.then);
	};
	exports.isThenable = isThenable;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var combineDispatch = function combineDispatch(rootDispatch, subDispatch) {
		return function (key, value) {
			return rootDispatch([function (value) {
				return subDispatch(key, value);
			}, key], value);
		};
	};

	exports["default"] = function (rootDispatch) {
		for (var _len = arguments.length, subDispatches = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			subDispatches[_key - 1] = arguments[_key];
		}

		return subDispatches.reduce(combineDispatch, rootDispatch);
	};

	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _types = __webpack_require__(4);

	var _combineHandlers = __webpack_require__(2);

	var _combineHandlers2 = _interopRequireDefault(_combineHandlers);

	var _createDispatch = __webpack_require__(1);

	var _createDispatch2 = _interopRequireDefault(_createDispatch);

	var _constants = __webpack_require__(3);

	var createStore = function createStore(rootDisaptch) {
		var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		if (_types.isArr(rootDisaptch)) {
			rootDisaptch = _createDispatch2['default'](_combineHandlers2['default'].apply(undefined, rootDisaptch));
		} else if (_types.isObj(rootDisaptch)) {
			rootDisaptch = _createDispatch2['default'](rootDisaptch);
		}

		if (!_types.isFn(rootDisaptch)) {
			throw new Error('Expected the rootDisaptch to be a function which is ' + rootDisaptch);
		}

		var listeners = [];
		var subscribe = function subscribe(listener) {
			listeners.push(listener);
			return function () {
				var index = listeners.indexOf(listener);
				if (index !== -1) {
					listeners.splice(index, 1);
				}
			};
		};

		var currentState = initialState;
		var replaceState = function replaceState(nextState) {
			currentState = nextState;
			listeners.forEach(function (listener) {
				return listener();
			});
		};
		var updateCurrentState = function updateCurrentState(data) {
			if (rootDisaptch(_constants.SHOULD_UPDATE, data) !== false) {
				replaceState(data.nextState);
				rootDisaptch(_constants.DID_UPDATE, data);
			}
		};

		var getState = function getState() {
			return currentState;
		};
		var getNextState = function getNextState(f) {
			return f(currentState);
		};
		var dispatchError = function dispatchError(error) {
			return rootDisaptch(_constants.THROW_ERROR, error);
		};

		var isDispatching = false;
		var dispatch = function dispatch(key, value) {
			if (isDispatching) {
				throw new Error('store.dispatch(key, value): handler may not dispatch');
			}

			var currentData = { currentState: currentState, key: key, value: value };

			rootDisaptch(_constants.DISPATCH, currentData);
			if (rootDisaptch(_constants.SHOULD_DISPATCH, currentData) === false) {
				return currentState;
			}
			rootDisaptch(_constants.WILL_UPDATE, currentData);

			var nextState = undefined;
			try {
				isDispatching = true;
				nextState = rootDisaptch([key, getNextState], value);
			} catch (error) {
				dispatchError(error);
				return currentState;
			} finally {
				isDispatching = false;
			}

			var data = { currentState: currentState, nextState: nextState, key: key, value: value };

			if (!_types.isThenable(nextState)) {
				updateCurrentState(data);
				rootDisaptch(_constants.SYNC, data);
				return currentState;
			}

			rootDisaptch(_constants.ASYNC_START, data);
			return nextState.then(function (nextState) {
				var data = { currentState: currentState, nextState: nextState, key: key, value: value };
				updateCurrentState(data);
				rootDisaptch(_constants.ASYNC_END, data);
				return currentState;
			}, dispatchError);
		};

		return {
			dispatch: dispatch,
			getState: getState,
			replaceState: replaceState,
			subscribe: subscribe
		};
	};

	exports['default'] = createStore;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;

	exports["default"] = function (obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	};

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;