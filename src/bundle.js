/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "bdf4d061f4da7cae4c4b"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _angular = __webpack_require__(1);\n\nvar _angular2 = _interopRequireDefault(_angular);\n\nvar _angularRoute = __webpack_require__(3);\n\nvar _angularRoute2 = _interopRequireDefault(_angularRoute);\n\nvar _underscore = __webpack_require__(5);\n\nvar _underscore2 = _interopRequireDefault(_underscore);\n\nvar _main = __webpack_require__(6);\n\nvar _main2 = _interopRequireDefault(_main);\n\nvar _auth = __webpack_require__(7);\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nvar _blog = __webpack_require__(8);\n\nvar _blog2 = _interopRequireDefault(_blog);\n\nvar _getJSON = __webpack_require__(9);\n\nvar _getJSON2 = _interopRequireDefault(_getJSON);\n\nvar _titleCase = __webpack_require__(10);\n\nvar _titleCase2 = _interopRequireDefault(_titleCase);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// arrange components\n\n// services\nvar controllers = [_main2.default, _auth2.default, _blog2.default];\n// filters\n\n\n// controllers\n\nvar services = [_getJSON2.default];\nvar directives = [];\nvar filters = [_titleCase2.default];\n\n// connect components to main module\nvar components = _angular2.default.module('frontcamp16.components', ['ng']);\n\ncontrollers.forEach(function (controller) {\n  _underscore2.default.each(controller, function (controller, name) {\n    components.controller(name, controller);\n  });\n});\n\ndirectives.forEach(function (directive) {\n  _underscore2.default.each(directive, function (directive, name) {\n    components.directive(name, directive);\n  });\n});\n\nservices.forEach(function (service) {\n  _underscore2.default.each(service, function (factory, name) {\n    components.factory(name, factory);\n  });\n});\n\nfilters.forEach(function (filter) {\n  _underscore2.default.each(filter, function (filter, name) {\n    components.filter(name, filter);\n  });\n});\n\n// main application module with routing\nvar app = _angular2.default.module('frontcamp16', ['frontcamp16.components', 'ngRoute']);\n\napp.config([\"$routeProvider\", \"$locationProvider\", function ($routeProvider, $locationProvider) {\n  $routeProvider.when('/', {\n    templateUrl: 'app/home/home.html',\n    controller: 'MainController'\n  }).when('/login', {\n    templateUrl: 'app/authentification/login.html',\n    controller: 'AuthController'\n  }).when('/register', {\n    templateUrl: 'app/authentification/register.html',\n    controller: 'AuthController'\n  }).when('/blog', {\n    templateUrl: 'app/blog/blog.html',\n    controller: 'BlogController'\n  }).when('/newpost', {\n    templateUrl: 'app/newpost/newPost.html',\n    controller: 'BlogController'\n  });\n\n  $locationProvider.html5Mode(false); // there is no need to use HTML5 history API\n  $locationProvider.hashPrefix(''); // by default it is set to '!'\n}]);\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/app.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./app/app.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(2);\nmodule.exports = angular;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ../~/angular/index.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///../~/angular/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(4);\nmodule.exports = 'ngRoute';\n\n\n//////////////////\n// WEBPACK FOOTER\n// ../~/angular-route/index.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///../~/angular-route/index.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("/**\n * @license AngularJS v1.6.1\n * (c) 2010-2016 Google, Inc. http://angularjs.org\n * License: MIT\n */\n(function(window, angular) {'use strict';\n\n/* global shallowCopy: true */\n\n/**\n * Creates a shallow copy of an object, an array or a primitive.\n *\n * Assumes that there are no proto properties for objects.\n */\nfunction shallowCopy(src, dst) {\n  if (isArray(src)) {\n    dst = dst || [];\n\n    for (var i = 0, ii = src.length; i < ii; i++) {\n      dst[i] = src[i];\n    }\n  } else if (isObject(src)) {\n    dst = dst || {};\n\n    for (var key in src) {\n      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {\n        dst[key] = src[key];\n      }\n    }\n  }\n\n  return dst || src;\n}\n\n/* global shallowCopy: false */\n\n// `isArray` and `isObject` are necessary for `shallowCopy()` (included via `src/shallowCopy.js`).\n// They are initialized inside the `$RouteProvider`, to ensure `window.angular` is available.\nvar isArray;\nvar isObject;\nvar isDefined;\n\n/**\n * @ngdoc module\n * @name ngRoute\n * @description\n *\n * # ngRoute\n *\n * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.\n *\n * ## Example\n * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.\n *\n *\n * <div doc-module-components=\"ngRoute\"></div>\n */\n/* global -ngRouteModule */\nvar ngRouteModule = angular.\n  module('ngRoute', []).\n  provider('$route', $RouteProvider).\n  // Ensure `$route` will be instantiated in time to capture the initial `$locationChangeSuccess`\n  // event (unless explicitly disabled). This is necessary in case `ngView` is included in an\n  // asynchronously loaded template.\n  run(instantiateRoute);\nvar $routeMinErr = angular.$$minErr('ngRoute');\nvar isEagerInstantiationEnabled;\n\n\n/**\n * @ngdoc provider\n * @name $routeProvider\n * @this\n *\n * @description\n *\n * Used for configuring routes.\n *\n * ## Example\n * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.\n *\n * ## Dependencies\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n */\nfunction $RouteProvider() {\n  isArray = angular.isArray;\n  isObject = angular.isObject;\n  isDefined = angular.isDefined;\n\n  function inherit(parent, extra) {\n    return angular.extend(Object.create(parent), extra);\n  }\n\n  var routes = {};\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#when\n   *\n   * @param {string} path Route path (matched against `$location.path`). If `$location.path`\n   *    contains redundant trailing slash or is missing one, the route will still match and the\n   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the\n   *    route definition.\n   *\n   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up\n   *        to the next slash are matched and stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain named groups starting with a colon and ending with a star:\n   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`\n   *        when the route matches.\n   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.\n   *\n   *    For example, routes like `/color/:color/largecode/:largecode*\\/edit` will match\n   *    `/color/brown/largecode/code/with/slashes/edit` and extract:\n   *\n   *    * `color: brown`\n   *    * `largecode: code/with/slashes`.\n   *\n   *\n   * @param {Object} route Mapping information to be assigned to `$route.current` on route\n   *    match.\n   *\n   *    Object properties:\n   *\n   *    - `controller` – `{(string|Function)=}` – Controller fn that should be associated with\n   *      newly created scope or the name of a {@link angular.Module#controller registered\n   *      controller} if passed as a string.\n   *    - `controllerAs` – `{string=}` – An identifier name for a reference to the controller.\n   *      If present, the controller will be published to scope under the `controllerAs` name.\n   *    - `template` – `{(string|Function)=}` – html template as a string or a function that\n   *      returns an html template as a string which should be used by {@link\n   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.\n   *      This property takes precedence over `templateUrl`.\n   *\n   *      If `template` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `template` or `templateUrl` is required.\n   *\n   *    - `templateUrl` – `{(string|Function)=}` – path or function that returns a path to an html\n   *      template that should be used by {@link ngRoute.directive:ngView ngView}.\n   *\n   *      If `templateUrl` is a function, it will be called with the following parameters:\n   *\n   *      - `{Array.<Object>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route\n   *\n   *      One of `templateUrl` or `template` is required.\n   *\n   *    - `resolve` - `{Object.<string, Function>=}` - An optional map of dependencies which should\n   *      be injected into the controller. If any of these dependencies are promises, the router\n   *      will wait for them all to be resolved or one to be rejected before the controller is\n   *      instantiated.\n   *      If all the promises are resolved successfully, the values of the resolved promises are\n   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is\n   *      fired. If any of the promises are rejected the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired.\n   *      For easier access to the resolved dependencies from the template, the `resolve` map will\n   *      be available on the scope of the route, under `$resolve` (by default) or a custom name\n   *      specified by the `resolveAs` property (see below). This can be particularly useful, when\n   *      working with {@link angular.Module#component components} as route templates.<br />\n   *      <div class=\"alert alert-warning\">\n   *        **Note:** If your scope already contains a property with this name, it will be hidden\n   *        or overwritten. Make sure, you specify an appropriate name for this property, that\n   *        does not collide with other properties on the scope.\n   *      </div>\n   *      The map object is:\n   *\n   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.\n   *      - `factory` - `{string|Function}`: If `string` then it is an alias for a service.\n   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}\n   *        and the return value is treated as the dependency. If the result is a promise, it is\n   *        resolved before its value is injected into the controller. Be aware that\n   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve\n   *        functions.  Use `$route.current.params` to access the new route parameters, instead.\n   *\n   *    - `resolveAs` - `{string=}` - The name under which the `resolve` map will be available on\n   *      the scope of the route. If omitted, defaults to `$resolve`.\n   *\n   *    - `redirectTo` – `{(string|Function)=}` – value to update\n   *      {@link ng.$location $location} path with and trigger route redirection.\n   *\n   *      If `redirectTo` is a function, it will be called with the following parameters:\n   *\n   *      - `{Object.<string>}` - route parameters extracted from the current\n   *        `$location.path()` by applying the current route templateUrl.\n   *      - `{string}` - current `$location.path()`\n   *      - `{Object}` - current `$location.search()`\n   *\n   *      The custom `redirectTo` function is expected to return a string which will be used\n   *      to update `$location.url()`. If the function throws an error, no further processing will\n   *      take place and the {@link ngRoute.$route#$routeChangeError $routeChangeError} event will\n   *      be fired.\n   *\n   *      Routes that specify `redirectTo` will not have their controllers, template functions\n   *      or resolves called, the `$location` will be changed to the redirect url and route\n   *      processing will stop. The exception to this is if the `redirectTo` is a function that\n   *      returns `undefined`. In this case the route transition occurs as though there was no\n   *      redirection.\n   *\n   *    - `resolveRedirectTo` – `{Function=}` – a function that will (eventually) return the value\n   *      to update {@link ng.$location $location} URL with and trigger route redirection. In\n   *      contrast to `redirectTo`, dependencies can be injected into `resolveRedirectTo` and the\n   *      return value can be either a string or a promise that will be resolved to a string.\n   *\n   *      Similar to `redirectTo`, if the return value is `undefined` (or a promise that gets\n   *      resolved to `undefined`), no redirection takes place and the route transition occurs as\n   *      though there was no redirection.\n   *\n   *      If the function throws an error or the returned promise gets rejected, no further\n   *      processing will take place and the\n   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event will be fired.\n   *\n   *      `redirectTo` takes precedence over `resolveRedirectTo`, so specifying both on the same\n   *      route definition, will cause the latter to be ignored.\n   *\n   *    - `[reloadOnSearch=true]` - `{boolean=}` - reload route when only `$location.search()`\n   *      or `$location.hash()` changes.\n   *\n   *      If the option is set to `false` and url in the browser changes, then\n   *      `$routeUpdate` event is broadcasted on the root scope.\n   *\n   *    - `[caseInsensitiveMatch=false]` - `{boolean=}` - match routes without being case sensitive\n   *\n   *      If the option is set to `true`, then the particular route can be matched without being\n   *      case sensitive\n   *\n   * @returns {Object} self\n   *\n   * @description\n   * Adds a new route definition to the `$route` service.\n   */\n  this.when = function(path, route) {\n    //copy original route object to preserve params inherited from proto chain\n    var routeCopy = shallowCopy(route);\n    if (angular.isUndefined(routeCopy.reloadOnSearch)) {\n      routeCopy.reloadOnSearch = true;\n    }\n    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {\n      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;\n    }\n    routes[path] = angular.extend(\n      routeCopy,\n      path && pathRegExp(path, routeCopy)\n    );\n\n    // create redirection for trailing slashes\n    if (path) {\n      var redirectPath = (path[path.length - 1] === '/')\n            ? path.substr(0, path.length - 1)\n            : path + '/';\n\n      routes[redirectPath] = angular.extend(\n        {redirectTo: path},\n        pathRegExp(redirectPath, routeCopy)\n      );\n    }\n\n    return this;\n  };\n\n  /**\n   * @ngdoc property\n   * @name $routeProvider#caseInsensitiveMatch\n   * @description\n   *\n   * A boolean property indicating if routes defined\n   * using this provider should be matched using a case insensitive\n   * algorithm. Defaults to `false`.\n   */\n  this.caseInsensitiveMatch = false;\n\n   /**\n    * @param path {string} path\n    * @param opts {Object} options\n    * @return {?Object}\n    *\n    * @description\n    * Normalizes the given path, returning a regular expression\n    * and the original path.\n    *\n    * Inspired by pathRexp in visionmedia/express/lib/utils.js.\n    */\n  function pathRegExp(path, opts) {\n    var insensitive = opts.caseInsensitiveMatch,\n        ret = {\n          originalPath: path,\n          regexp: path\n        },\n        keys = ret.keys = [];\n\n    path = path\n      .replace(/([().])/g, '\\\\$1')\n      .replace(/(\\/)?:(\\w+)(\\*\\?|[?*])?/g, function(_, slash, key, option) {\n        var optional = (option === '?' || option === '*?') ? '?' : null;\n        var star = (option === '*' || option === '*?') ? '*' : null;\n        keys.push({ name: key, optional: !!optional });\n        slash = slash || '';\n        return ''\n          + (optional ? '' : slash)\n          + '(?:'\n          + (optional ? slash : '')\n          + (star && '(.+?)' || '([^/]+)')\n          + (optional || '')\n          + ')'\n          + (optional || '');\n      })\n      .replace(/([/$*])/g, '\\\\$1');\n\n    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');\n    return ret;\n  }\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#otherwise\n   *\n   * @description\n   * Sets route definition that will be used on route change when no other route definition\n   * is matched.\n   *\n   * @param {Object|string} params Mapping information to be assigned to `$route.current`.\n   * If called with a string, the value maps to `redirectTo`.\n   * @returns {Object} self\n   */\n  this.otherwise = function(params) {\n    if (typeof params === 'string') {\n      params = {redirectTo: params};\n    }\n    this.when(null, params);\n    return this;\n  };\n\n  /**\n   * @ngdoc method\n   * @name $routeProvider#eagerInstantiationEnabled\n   * @kind function\n   *\n   * @description\n   * Call this method as a setter to enable/disable eager instantiation of the\n   * {@link ngRoute.$route $route} service upon application bootstrap. You can also call it as a\n   * getter (i.e. without any arguments) to get the current value of the\n   * `eagerInstantiationEnabled` flag.\n   *\n   * Instantiating `$route` early is necessary for capturing the initial\n   * {@link ng.$location#$locationChangeStart $locationChangeStart} event and navigating to the\n   * appropriate route. Usually, `$route` is instantiated in time by the\n   * {@link ngRoute.ngView ngView} directive. Yet, in cases where `ngView` is included in an\n   * asynchronously loaded template (e.g. in another directive's template), the directive factory\n   * might not be called soon enough for `$route` to be instantiated _before_ the initial\n   * `$locationChangeSuccess` event is fired. Eager instantiation ensures that `$route` is always\n   * instantiated in time, regardless of when `ngView` will be loaded.\n   *\n   * The default value is true.\n   *\n   * **Note**:<br />\n   * You may want to disable the default behavior when unit-testing modules that depend on\n   * `ngRoute`, in order to avoid an unexpected request for the default route's template.\n   *\n   * @param {boolean=} enabled - If provided, update the internal `eagerInstantiationEnabled` flag.\n   *\n   * @returns {*} The current value of the `eagerInstantiationEnabled` flag if used as a getter or\n   *     itself (for chaining) if used as a setter.\n   */\n  isEagerInstantiationEnabled = true;\n  this.eagerInstantiationEnabled = function eagerInstantiationEnabled(enabled) {\n    if (isDefined(enabled)) {\n      isEagerInstantiationEnabled = enabled;\n      return this;\n    }\n\n    return isEagerInstantiationEnabled;\n  };\n\n\n  this.$get = ['$rootScope',\n               '$location',\n               '$routeParams',\n               '$q',\n               '$injector',\n               '$templateRequest',\n               '$sce',\n      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {\n\n    /**\n     * @ngdoc service\n     * @name $route\n     * @requires $location\n     * @requires $routeParams\n     *\n     * @property {Object} current Reference to the current route definition.\n     * The route definition contains:\n     *\n     *   - `controller`: The controller constructor as defined in the route definition.\n     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for\n     *     controller instantiation. The `locals` contain\n     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:\n     *\n     *     - `$scope` - The current route scope.\n     *     - `$template` - The current route template HTML.\n     *\n     *     The `locals` will be assigned to the route scope's `$resolve` property. You can override\n     *     the property name, using `resolveAs` in the route definition. See\n     *     {@link ngRoute.$routeProvider $routeProvider} for more info.\n     *\n     * @property {Object} routes Object with all route configuration Objects as its properties.\n     *\n     * @description\n     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).\n     * It watches `$location.url()` and tries to map the path to an existing route definition.\n     *\n     * Requires the {@link ngRoute `ngRoute`} module to be installed.\n     *\n     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.\n     *\n     * The `$route` service is typically used in conjunction with the\n     * {@link ngRoute.directive:ngView `ngView`} directive and the\n     * {@link ngRoute.$routeParams `$routeParams`} service.\n     *\n     * @example\n     * This example shows how changing the URL hash causes the `$route` to match a route against the\n     * URL, and the `ngView` pulls in the partial.\n     *\n     * <example name=\"$route-service\" module=\"ngRouteExample\"\n     *          deps=\"angular-route.js\" fixBase=\"true\">\n     *   <file name=\"index.html\">\n     *     <div ng-controller=\"MainController\">\n     *       Choose:\n     *       <a href=\"Book/Moby\">Moby</a> |\n     *       <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n     *       <a href=\"Book/Gatsby\">Gatsby</a> |\n     *       <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n     *       <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n     *\n     *       <div ng-view></div>\n     *\n     *       <hr />\n     *\n     *       <pre>$location.path() = {{$location.path()}}</pre>\n     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>\n     *       <pre>$route.current.params = {{$route.current.params}}</pre>\n     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>\n     *       <pre>$routeParams = {{$routeParams}}</pre>\n     *     </div>\n     *   </file>\n     *\n     *   <file name=\"book.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *   </file>\n     *\n     *   <file name=\"chapter.html\">\n     *     controller: {{name}}<br />\n     *     Book Id: {{params.bookId}}<br />\n     *     Chapter Id: {{params.chapterId}}\n     *   </file>\n     *\n     *   <file name=\"script.js\">\n     *     angular.module('ngRouteExample', ['ngRoute'])\n     *\n     *      .controller('MainController', function($scope, $route, $routeParams, $location) {\n     *          $scope.$route = $route;\n     *          $scope.$location = $location;\n     *          $scope.$routeParams = $routeParams;\n     *      })\n     *\n     *      .controller('BookController', function($scope, $routeParams) {\n     *          $scope.name = 'BookController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *      .controller('ChapterController', function($scope, $routeParams) {\n     *          $scope.name = 'ChapterController';\n     *          $scope.params = $routeParams;\n     *      })\n     *\n     *     .config(function($routeProvider, $locationProvider) {\n     *       $routeProvider\n     *        .when('/Book/:bookId', {\n     *         templateUrl: 'book.html',\n     *         controller: 'BookController',\n     *         resolve: {\n     *           // I will cause a 1 second delay\n     *           delay: function($q, $timeout) {\n     *             var delay = $q.defer();\n     *             $timeout(delay.resolve, 1000);\n     *             return delay.promise;\n     *           }\n     *         }\n     *       })\n     *       .when('/Book/:bookId/ch/:chapterId', {\n     *         templateUrl: 'chapter.html',\n     *         controller: 'ChapterController'\n     *       });\n     *\n     *       // configure html5 to get links working on jsfiddle\n     *       $locationProvider.html5Mode(true);\n     *     });\n     *\n     *   </file>\n     *\n     *   <file name=\"protractor.js\" type=\"protractor\">\n     *     it('should load and compile correct template', function() {\n     *       element(by.linkText('Moby: Ch1')).click();\n     *       var content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: ChapterController/);\n     *       expect(content).toMatch(/Book Id: Moby/);\n     *       expect(content).toMatch(/Chapter Id: 1/);\n     *\n     *       element(by.partialLinkText('Scarlet')).click();\n     *\n     *       content = element(by.css('[ng-view]')).getText();\n     *       expect(content).toMatch(/controller: BookController/);\n     *       expect(content).toMatch(/Book Id: Scarlet/);\n     *     });\n     *   </file>\n     * </example>\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeStart\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted before a route change. At this  point the route services starts\n     * resolving all of the dependencies needed for the route change to occur.\n     * Typically this involves fetching the view template as well as any dependencies\n     * defined in `resolve` route property. Once  all of the dependencies are resolved\n     * `$routeChangeSuccess` is fired.\n     *\n     * The route change (and the `$location` change that triggered it) can be prevented\n     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}\n     * for more details about event object.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} next Future route information.\n     * @param {Route} current Current route information.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeSuccess\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted after a route change has happened successfully.\n     * The `resolve` dependencies are now available in the `current.locals` property.\n     *\n     * {@link ngRoute.directive:ngView ngView} listens for the directive\n     * to instantiate the controller and render the view.\n     *\n     * @param {Object} angularEvent Synthetic event object.\n     * @param {Route} current Current route information.\n     * @param {Route|Undefined} previous Previous route information, or undefined if current is\n     * first route entered.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeChangeError\n     * @eventType broadcast on root scope\n     * @description\n     * Broadcasted if a redirection function fails or any redirection or resolve promises are\n     * rejected.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current route information.\n     * @param {Route} previous Previous route information.\n     * @param {Route} rejection The thrown error or the rejection reason of the promise. Usually\n     * the rejection reason is the error that caused the promise to get rejected.\n     */\n\n    /**\n     * @ngdoc event\n     * @name $route#$routeUpdate\n     * @eventType broadcast on root scope\n     * @description\n     * The `reloadOnSearch` property has been set to false, and we are reusing the same\n     * instance of the Controller.\n     *\n     * @param {Object} angularEvent Synthetic event object\n     * @param {Route} current Current/previous route information.\n     */\n\n    var forceReload = false,\n        preparedRoute,\n        preparedRouteIsUpdateOnly,\n        $route = {\n          routes: routes,\n\n          /**\n           * @ngdoc method\n           * @name $route#reload\n           *\n           * @description\n           * Causes `$route` service to reload the current route even if\n           * {@link ng.$location $location} hasn't changed.\n           *\n           * As a result of that, {@link ngRoute.directive:ngView ngView}\n           * creates new scope and reinstantiates the controller.\n           */\n          reload: function() {\n            forceReload = true;\n\n            var fakeLocationEvent = {\n              defaultPrevented: false,\n              preventDefault: function fakePreventDefault() {\n                this.defaultPrevented = true;\n                forceReload = false;\n              }\n            };\n\n            $rootScope.$evalAsync(function() {\n              prepareRoute(fakeLocationEvent);\n              if (!fakeLocationEvent.defaultPrevented) commitRoute();\n            });\n          },\n\n          /**\n           * @ngdoc method\n           * @name $route#updateParams\n           *\n           * @description\n           * Causes `$route` service to update the current URL, replacing\n           * current route parameters with those specified in `newParams`.\n           * Provided property names that match the route's path segment\n           * definitions will be interpolated into the location's path, while\n           * remaining properties will be treated as query params.\n           *\n           * @param {!Object<string, string>} newParams mapping of URL parameter names to values\n           */\n          updateParams: function(newParams) {\n            if (this.current && this.current.$$route) {\n              newParams = angular.extend({}, this.current.params, newParams);\n              $location.path(interpolate(this.current.$$route.originalPath, newParams));\n              // interpolate modifies newParams, only query params are left\n              $location.search(newParams);\n            } else {\n              throw $routeMinErr('norout', 'Tried updating route when with no current route');\n            }\n          }\n        };\n\n    $rootScope.$on('$locationChangeStart', prepareRoute);\n    $rootScope.$on('$locationChangeSuccess', commitRoute);\n\n    return $route;\n\n    /////////////////////////////////////////////////////\n\n    /**\n     * @param on {string} current url\n     * @param route {Object} route regexp to match the url against\n     * @return {?Object}\n     *\n     * @description\n     * Check if the route matches the current url.\n     *\n     * Inspired by match in\n     * visionmedia/express/lib/router/router.js.\n     */\n    function switchRouteMatcher(on, route) {\n      var keys = route.keys,\n          params = {};\n\n      if (!route.regexp) return null;\n\n      var m = route.regexp.exec(on);\n      if (!m) return null;\n\n      for (var i = 1, len = m.length; i < len; ++i) {\n        var key = keys[i - 1];\n\n        var val = m[i];\n\n        if (key && val) {\n          params[key.name] = val;\n        }\n      }\n      return params;\n    }\n\n    function prepareRoute($locationEvent) {\n      var lastRoute = $route.current;\n\n      preparedRoute = parseRoute();\n      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route\n          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)\n          && !preparedRoute.reloadOnSearch && !forceReload;\n\n      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {\n        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {\n          if ($locationEvent) {\n            $locationEvent.preventDefault();\n          }\n        }\n      }\n    }\n\n    function commitRoute() {\n      var lastRoute = $route.current;\n      var nextRoute = preparedRoute;\n\n      if (preparedRouteIsUpdateOnly) {\n        lastRoute.params = nextRoute.params;\n        angular.copy(lastRoute.params, $routeParams);\n        $rootScope.$broadcast('$routeUpdate', lastRoute);\n      } else if (nextRoute || lastRoute) {\n        forceReload = false;\n        $route.current = nextRoute;\n\n        var nextRoutePromise = $q.resolve(nextRoute);\n\n        nextRoutePromise.\n          then(getRedirectionData).\n          then(handlePossibleRedirection).\n          then(function(keepProcessingRoute) {\n            return keepProcessingRoute && nextRoutePromise.\n              then(resolveLocals).\n              then(function(locals) {\n                // after route change\n                if (nextRoute === $route.current) {\n                  if (nextRoute) {\n                    nextRoute.locals = locals;\n                    angular.copy(nextRoute.params, $routeParams);\n                  }\n                  $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);\n                }\n              });\n          }).catch(function(error) {\n            if (nextRoute === $route.current) {\n              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);\n            }\n          });\n      }\n    }\n\n    function getRedirectionData(route) {\n      var data = {\n        route: route,\n        hasRedirection: false\n      };\n\n      if (route) {\n        if (route.redirectTo) {\n          if (angular.isString(route.redirectTo)) {\n            data.path = interpolate(route.redirectTo, route.params);\n            data.search = route.params;\n            data.hasRedirection = true;\n          } else {\n            var oldPath = $location.path();\n            var oldSearch = $location.search();\n            var newUrl = route.redirectTo(route.pathParams, oldPath, oldSearch);\n\n            if (angular.isDefined(newUrl)) {\n              data.url = newUrl;\n              data.hasRedirection = true;\n            }\n          }\n        } else if (route.resolveRedirectTo) {\n          return $q.\n            resolve($injector.invoke(route.resolveRedirectTo)).\n            then(function(newUrl) {\n              if (angular.isDefined(newUrl)) {\n                data.url = newUrl;\n                data.hasRedirection = true;\n              }\n\n              return data;\n            });\n        }\n      }\n\n      return data;\n    }\n\n    function handlePossibleRedirection(data) {\n      var keepProcessingRoute = true;\n\n      if (data.route !== $route.current) {\n        keepProcessingRoute = false;\n      } else if (data.hasRedirection) {\n        var oldUrl = $location.url();\n        var newUrl = data.url;\n\n        if (newUrl) {\n          $location.\n            url(newUrl).\n            replace();\n        } else {\n          newUrl = $location.\n            path(data.path).\n            search(data.search).\n            replace().\n            url();\n        }\n\n        if (newUrl !== oldUrl) {\n          // Exit out and don't process current next value,\n          // wait for next location change from redirect\n          keepProcessingRoute = false;\n        }\n      }\n\n      return keepProcessingRoute;\n    }\n\n    function resolveLocals(route) {\n      if (route) {\n        var locals = angular.extend({}, route.resolve);\n        angular.forEach(locals, function(value, key) {\n          locals[key] = angular.isString(value) ?\n              $injector.get(value) :\n              $injector.invoke(value, null, null, key);\n        });\n        var template = getTemplateFor(route);\n        if (angular.isDefined(template)) {\n          locals['$template'] = template;\n        }\n        return $q.all(locals);\n      }\n    }\n\n    function getTemplateFor(route) {\n      var template, templateUrl;\n      if (angular.isDefined(template = route.template)) {\n        if (angular.isFunction(template)) {\n          template = template(route.params);\n        }\n      } else if (angular.isDefined(templateUrl = route.templateUrl)) {\n        if (angular.isFunction(templateUrl)) {\n          templateUrl = templateUrl(route.params);\n        }\n        if (angular.isDefined(templateUrl)) {\n          route.loadedTemplateUrl = $sce.valueOf(templateUrl);\n          template = $templateRequest(templateUrl);\n        }\n      }\n      return template;\n    }\n\n    /**\n     * @returns {Object} the current active route, by matching it against the URL\n     */\n    function parseRoute() {\n      // Match a route\n      var params, match;\n      angular.forEach(routes, function(route, path) {\n        if (!match && (params = switchRouteMatcher($location.path(), route))) {\n          match = inherit(route, {\n            params: angular.extend({}, $location.search(), params),\n            pathParams: params});\n          match.$$route = route;\n        }\n      });\n      // No route matched; fallback to \"otherwise\" route\n      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});\n    }\n\n    /**\n     * @returns {string} interpolation of the redirect path with the parameters\n     */\n    function interpolate(string, params) {\n      var result = [];\n      angular.forEach((string || '').split(':'), function(segment, i) {\n        if (i === 0) {\n          result.push(segment);\n        } else {\n          var segmentMatch = segment.match(/(\\w+)(?:[?*])?(.*)/);\n          var key = segmentMatch[1];\n          result.push(params[key]);\n          result.push(segmentMatch[2] || '');\n          delete params[key];\n        }\n      });\n      return result.join('');\n    }\n  }];\n}\n\ninstantiateRoute.$inject = ['$injector'];\nfunction instantiateRoute($injector) {\n  if (isEagerInstantiationEnabled) {\n    // Instantiate `$route`\n    $injector.get('$route');\n  }\n}\n\nngRouteModule.provider('$routeParams', $RouteParamsProvider);\n\n\n/**\n * @ngdoc service\n * @name $routeParams\n * @requires $route\n * @this\n *\n * @description\n * The `$routeParams` service allows you to retrieve the current set of route parameters.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * The route parameters are a combination of {@link ng.$location `$location`}'s\n * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.\n * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.\n *\n * In case of parameter name collision, `path` params take precedence over `search` params.\n *\n * The service guarantees that the identity of the `$routeParams` object will remain unchanged\n * (but its properties will likely change) even when a route change occurs.\n *\n * Note that the `$routeParams` are only updated *after* a route change completes successfully.\n * This means that you cannot rely on `$routeParams` being correct in route resolve functions.\n * Instead you can use `$route.current.params` to access the new route's parameters.\n *\n * @example\n * ```js\n *  // Given:\n *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby\n *  // Route: /Chapter/:chapterId/Section/:sectionId\n *  //\n *  // Then\n *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}\n * ```\n */\nfunction $RouteParamsProvider() {\n  this.$get = function() { return {}; };\n}\n\nngRouteModule.directive('ngView', ngViewFactory);\nngRouteModule.directive('ngView', ngViewFillContentFactory);\n\n\n/**\n * @ngdoc directive\n * @name ngView\n * @restrict ECA\n *\n * @description\n * # Overview\n * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by\n * including the rendered template of the current route into the main layout (`index.html`) file.\n * Every time the current route changes, the included view changes with it according to the\n * configuration of the `$route` service.\n *\n * Requires the {@link ngRoute `ngRoute`} module to be installed.\n *\n * @animations\n * | Animation                        | Occurs                              |\n * |----------------------------------|-------------------------------------|\n * | {@link ng.$animate#enter enter}  | when the new element is inserted to the DOM |\n * | {@link ng.$animate#leave leave}  | when the old element is removed from to the DOM  |\n *\n * The enter and leave animation occur concurrently.\n *\n * @scope\n * @priority 400\n * @param {string=} onload Expression to evaluate whenever the view updates.\n *\n * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll\n *                  $anchorScroll} to scroll the viewport after the view is updated.\n *\n *                  - If the attribute is not set, disable scrolling.\n *                  - If the attribute is set without value, enable scrolling.\n *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated\n *                    as an expression yields a truthy value.\n * @example\n    <example name=\"ngView-directive\" module=\"ngViewExample\"\n             deps=\"angular-route.js;angular-animate.js\"\n             animations=\"true\" fixBase=\"true\">\n      <file name=\"index.html\">\n        <div ng-controller=\"MainCtrl as main\">\n          Choose:\n          <a href=\"Book/Moby\">Moby</a> |\n          <a href=\"Book/Moby/ch/1\">Moby: Ch1</a> |\n          <a href=\"Book/Gatsby\">Gatsby</a> |\n          <a href=\"Book/Gatsby/ch/4?key=value\">Gatsby: Ch4</a> |\n          <a href=\"Book/Scarlet\">Scarlet Letter</a><br/>\n\n          <div class=\"view-animate-container\">\n            <div ng-view class=\"view-animate\"></div>\n          </div>\n          <hr />\n\n          <pre>$location.path() = {{main.$location.path()}}</pre>\n          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>\n          <pre>$route.current.params = {{main.$route.current.params}}</pre>\n          <pre>$routeParams = {{main.$routeParams}}</pre>\n        </div>\n      </file>\n\n      <file name=\"book.html\">\n        <div>\n          controller: {{book.name}}<br />\n          Book Id: {{book.params.bookId}}<br />\n        </div>\n      </file>\n\n      <file name=\"chapter.html\">\n        <div>\n          controller: {{chapter.name}}<br />\n          Book Id: {{chapter.params.bookId}}<br />\n          Chapter Id: {{chapter.params.chapterId}}\n        </div>\n      </file>\n\n      <file name=\"animations.css\">\n        .view-animate-container {\n          position:relative;\n          height:100px!important;\n          background:white;\n          border:1px solid black;\n          height:40px;\n          overflow:hidden;\n        }\n\n        .view-animate {\n          padding:10px;\n        }\n\n        .view-animate.ng-enter, .view-animate.ng-leave {\n          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;\n\n          display:block;\n          width:100%;\n          border-left:1px solid black;\n\n          position:absolute;\n          top:0;\n          left:0;\n          right:0;\n          bottom:0;\n          padding:10px;\n        }\n\n        .view-animate.ng-enter {\n          left:100%;\n        }\n        .view-animate.ng-enter.ng-enter-active {\n          left:0;\n        }\n        .view-animate.ng-leave.ng-leave-active {\n          left:-100%;\n        }\n      </file>\n\n      <file name=\"script.js\">\n        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])\n          .config(['$routeProvider', '$locationProvider',\n            function($routeProvider, $locationProvider) {\n              $routeProvider\n                .when('/Book/:bookId', {\n                  templateUrl: 'book.html',\n                  controller: 'BookCtrl',\n                  controllerAs: 'book'\n                })\n                .when('/Book/:bookId/ch/:chapterId', {\n                  templateUrl: 'chapter.html',\n                  controller: 'ChapterCtrl',\n                  controllerAs: 'chapter'\n                });\n\n              $locationProvider.html5Mode(true);\n          }])\n          .controller('MainCtrl', ['$route', '$routeParams', '$location',\n            function MainCtrl($route, $routeParams, $location) {\n              this.$route = $route;\n              this.$location = $location;\n              this.$routeParams = $routeParams;\n          }])\n          .controller('BookCtrl', ['$routeParams', function BookCtrl($routeParams) {\n            this.name = 'BookCtrl';\n            this.params = $routeParams;\n          }])\n          .controller('ChapterCtrl', ['$routeParams', function ChapterCtrl($routeParams) {\n            this.name = 'ChapterCtrl';\n            this.params = $routeParams;\n          }]);\n\n      </file>\n\n      <file name=\"protractor.js\" type=\"protractor\">\n        it('should load and compile correct template', function() {\n          element(by.linkText('Moby: Ch1')).click();\n          var content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: ChapterCtrl/);\n          expect(content).toMatch(/Book Id: Moby/);\n          expect(content).toMatch(/Chapter Id: 1/);\n\n          element(by.partialLinkText('Scarlet')).click();\n\n          content = element(by.css('[ng-view]')).getText();\n          expect(content).toMatch(/controller: BookCtrl/);\n          expect(content).toMatch(/Book Id: Scarlet/);\n        });\n      </file>\n    </example>\n */\n\n\n/**\n * @ngdoc event\n * @name ngView#$viewContentLoaded\n * @eventType emit on the current ngView scope\n * @description\n * Emitted every time the ngView content is reloaded.\n */\nngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];\nfunction ngViewFactory($route, $anchorScroll, $animate) {\n  return {\n    restrict: 'ECA',\n    terminal: true,\n    priority: 400,\n    transclude: 'element',\n    link: function(scope, $element, attr, ctrl, $transclude) {\n        var currentScope,\n            currentElement,\n            previousLeaveAnimation,\n            autoScrollExp = attr.autoscroll,\n            onloadExp = attr.onload || '';\n\n        scope.$on('$routeChangeSuccess', update);\n        update();\n\n        function cleanupLastView() {\n          if (previousLeaveAnimation) {\n            $animate.cancel(previousLeaveAnimation);\n            previousLeaveAnimation = null;\n          }\n\n          if (currentScope) {\n            currentScope.$destroy();\n            currentScope = null;\n          }\n          if (currentElement) {\n            previousLeaveAnimation = $animate.leave(currentElement);\n            previousLeaveAnimation.done(function(response) {\n              if (response !== false) previousLeaveAnimation = null;\n            });\n            currentElement = null;\n          }\n        }\n\n        function update() {\n          var locals = $route.current && $route.current.locals,\n              template = locals && locals.$template;\n\n          if (angular.isDefined(template)) {\n            var newScope = scope.$new();\n            var current = $route.current;\n\n            // Note: This will also link all children of ng-view that were contained in the original\n            // html. If that content contains controllers, ... they could pollute/change the scope.\n            // However, using ng-view on an element with additional content does not make sense...\n            // Note: We can't remove them in the cloneAttchFn of $transclude as that\n            // function is called before linking the content, which would apply child\n            // directives to non existing elements.\n            var clone = $transclude(newScope, function(clone) {\n              $animate.enter(clone, null, currentElement || $element).done(function onNgViewEnter(response) {\n                if (response !== false && angular.isDefined(autoScrollExp)\n                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {\n                  $anchorScroll();\n                }\n              });\n              cleanupLastView();\n            });\n\n            currentElement = clone;\n            currentScope = current.scope = newScope;\n            currentScope.$emit('$viewContentLoaded');\n            currentScope.$eval(onloadExp);\n          } else {\n            cleanupLastView();\n          }\n        }\n    }\n  };\n}\n\n// This directive is called during the $transclude call of the first `ngView` directive.\n// It will replace and compile the content of the element with the loaded template.\n// We need this directive so that the element content is already filled when\n// the link function of another directive on the same element as ngView\n// is called.\nngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];\nfunction ngViewFillContentFactory($compile, $controller, $route) {\n  return {\n    restrict: 'ECA',\n    priority: -400,\n    link: function(scope, $element) {\n      var current = $route.current,\n          locals = current.locals;\n\n      $element.html(locals.$template);\n\n      var link = $compile($element.contents());\n\n      if (current.controller) {\n        locals.$scope = scope;\n        var controller = $controller(current.controller, locals);\n        if (current.controllerAs) {\n          scope[current.controllerAs] = controller;\n        }\n        $element.data('$ngControllerController', controller);\n        $element.children().data('$ngControllerController', controller);\n      }\n      scope[current.resolveAs || '$resolve'] = locals;\n\n      link(scope);\n    }\n  };\n}\n\n\n})(window, window.angular);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ../~/angular-route/angular-route.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///../~/angular-route/angular-route.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("//     Underscore.js 1.5.2\n//     http://underscorejs.org\n//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors\n//     Underscore may be freely distributed under the MIT license.\n\n(function() {\n\n  // Baseline setup\n  // --------------\n\n  // Establish the root object, `window` in the browser, or `exports` on the server.\n  var root = this;\n\n  // Save the previous value of the `_` variable.\n  var previousUnderscore = root._;\n\n  // Establish the object that gets returned to break out of a loop iteration.\n  var breaker = {};\n\n  // Save bytes in the minified (but not gzipped) version:\n  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;\n\n  // Create quick reference variables for speed access to core prototypes.\n  var\n    push             = ArrayProto.push,\n    slice            = ArrayProto.slice,\n    concat           = ArrayProto.concat,\n    toString         = ObjProto.toString,\n    hasOwnProperty   = ObjProto.hasOwnProperty;\n\n  // All **ECMAScript 5** native function implementations that we hope to use\n  // are declared here.\n  var\n    nativeForEach      = ArrayProto.forEach,\n    nativeMap          = ArrayProto.map,\n    nativeReduce       = ArrayProto.reduce,\n    nativeReduceRight  = ArrayProto.reduceRight,\n    nativeFilter       = ArrayProto.filter,\n    nativeEvery        = ArrayProto.every,\n    nativeSome         = ArrayProto.some,\n    nativeIndexOf      = ArrayProto.indexOf,\n    nativeLastIndexOf  = ArrayProto.lastIndexOf,\n    nativeIsArray      = Array.isArray,\n    nativeKeys         = Object.keys,\n    nativeBind         = FuncProto.bind;\n\n  // Create a safe reference to the Underscore object for use below.\n  var _ = function(obj) {\n    if (obj instanceof _) return obj;\n    if (!(this instanceof _)) return new _(obj);\n    this._wrapped = obj;\n  };\n\n  // Export the Underscore object for **Node.js**, with\n  // backwards-compatibility for the old `require()` API. If we're in\n  // the browser, add `_` as a global object via a string identifier,\n  // for Closure Compiler \"advanced\" mode.\n  if (true) {\n    if (typeof module !== 'undefined' && module.exports) {\n      exports = module.exports = _;\n    }\n    exports._ = _;\n  } else {\n    root._ = _;\n  }\n\n  // Current version.\n  _.VERSION = '1.5.2';\n\n  // Collection Functions\n  // --------------------\n\n  // The cornerstone, an `each` implementation, aka `forEach`.\n  // Handles objects with the built-in `forEach`, arrays, and raw objects.\n  // Delegates to **ECMAScript 5**'s native `forEach` if available.\n  var each = _.each = _.forEach = function(obj, iterator, context) {\n    if (obj == null) return;\n    if (nativeForEach && obj.forEach === nativeForEach) {\n      obj.forEach(iterator, context);\n    } else if (obj.length === +obj.length) {\n      for (var i = 0, length = obj.length; i < length; i++) {\n        if (iterator.call(context, obj[i], i, obj) === breaker) return;\n      }\n    } else {\n      var keys = _.keys(obj);\n      for (var i = 0, length = keys.length; i < length; i++) {\n        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;\n      }\n    }\n  };\n\n  // Return the results of applying the iterator to each element.\n  // Delegates to **ECMAScript 5**'s native `map` if available.\n  _.map = _.collect = function(obj, iterator, context) {\n    var results = [];\n    if (obj == null) return results;\n    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);\n    each(obj, function(value, index, list) {\n      results.push(iterator.call(context, value, index, list));\n    });\n    return results;\n  };\n\n  var reduceError = 'Reduce of empty array with no initial value';\n\n  // **Reduce** builds up a single result from a list of values, aka `inject`,\n  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.\n  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {\n    var initial = arguments.length > 2;\n    if (obj == null) obj = [];\n    if (nativeReduce && obj.reduce === nativeReduce) {\n      if (context) iterator = _.bind(iterator, context);\n      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);\n    }\n    each(obj, function(value, index, list) {\n      if (!initial) {\n        memo = value;\n        initial = true;\n      } else {\n        memo = iterator.call(context, memo, value, index, list);\n      }\n    });\n    if (!initial) throw new TypeError(reduceError);\n    return memo;\n  };\n\n  // The right-associative version of reduce, also known as `foldr`.\n  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.\n  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {\n    var initial = arguments.length > 2;\n    if (obj == null) obj = [];\n    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {\n      if (context) iterator = _.bind(iterator, context);\n      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);\n    }\n    var length = obj.length;\n    if (length !== +length) {\n      var keys = _.keys(obj);\n      length = keys.length;\n    }\n    each(obj, function(value, index, list) {\n      index = keys ? keys[--length] : --length;\n      if (!initial) {\n        memo = obj[index];\n        initial = true;\n      } else {\n        memo = iterator.call(context, memo, obj[index], index, list);\n      }\n    });\n    if (!initial) throw new TypeError(reduceError);\n    return memo;\n  };\n\n  // Return the first value which passes a truth test. Aliased as `detect`.\n  _.find = _.detect = function(obj, iterator, context) {\n    var result;\n    any(obj, function(value, index, list) {\n      if (iterator.call(context, value, index, list)) {\n        result = value;\n        return true;\n      }\n    });\n    return result;\n  };\n\n  // Return all the elements that pass a truth test.\n  // Delegates to **ECMAScript 5**'s native `filter` if available.\n  // Aliased as `select`.\n  _.filter = _.select = function(obj, iterator, context) {\n    var results = [];\n    if (obj == null) return results;\n    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);\n    each(obj, function(value, index, list) {\n      if (iterator.call(context, value, index, list)) results.push(value);\n    });\n    return results;\n  };\n\n  // Return all the elements for which a truth test fails.\n  _.reject = function(obj, iterator, context) {\n    return _.filter(obj, function(value, index, list) {\n      return !iterator.call(context, value, index, list);\n    }, context);\n  };\n\n  // Determine whether all of the elements match a truth test.\n  // Delegates to **ECMAScript 5**'s native `every` if available.\n  // Aliased as `all`.\n  _.every = _.all = function(obj, iterator, context) {\n    iterator || (iterator = _.identity);\n    var result = true;\n    if (obj == null) return result;\n    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);\n    each(obj, function(value, index, list) {\n      if (!(result = result && iterator.call(context, value, index, list))) return breaker;\n    });\n    return !!result;\n  };\n\n  // Determine if at least one element in the object matches a truth test.\n  // Delegates to **ECMAScript 5**'s native `some` if available.\n  // Aliased as `any`.\n  var any = _.some = _.any = function(obj, iterator, context) {\n    iterator || (iterator = _.identity);\n    var result = false;\n    if (obj == null) return result;\n    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);\n    each(obj, function(value, index, list) {\n      if (result || (result = iterator.call(context, value, index, list))) return breaker;\n    });\n    return !!result;\n  };\n\n  // Determine if the array or object contains a given value (using `===`).\n  // Aliased as `include`.\n  _.contains = _.include = function(obj, target) {\n    if (obj == null) return false;\n    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;\n    return any(obj, function(value) {\n      return value === target;\n    });\n  };\n\n  // Invoke a method (with arguments) on every item in a collection.\n  _.invoke = function(obj, method) {\n    var args = slice.call(arguments, 2);\n    var isFunc = _.isFunction(method);\n    return _.map(obj, function(value) {\n      return (isFunc ? method : value[method]).apply(value, args);\n    });\n  };\n\n  // Convenience version of a common use case of `map`: fetching a property.\n  _.pluck = function(obj, key) {\n    return _.map(obj, function(value){ return value[key]; });\n  };\n\n  // Convenience version of a common use case of `filter`: selecting only objects\n  // containing specific `key:value` pairs.\n  _.where = function(obj, attrs, first) {\n    if (_.isEmpty(attrs)) return first ? void 0 : [];\n    return _[first ? 'find' : 'filter'](obj, function(value) {\n      for (var key in attrs) {\n        if (attrs[key] !== value[key]) return false;\n      }\n      return true;\n    });\n  };\n\n  // Convenience version of a common use case of `find`: getting the first object\n  // containing specific `key:value` pairs.\n  _.findWhere = function(obj, attrs) {\n    return _.where(obj, attrs, true);\n  };\n\n  // Return the maximum element or (element-based computation).\n  // Can't optimize arrays of integers longer than 65,535 elements.\n  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)\n  _.max = function(obj, iterator, context) {\n    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {\n      return Math.max.apply(Math, obj);\n    }\n    if (!iterator && _.isEmpty(obj)) return -Infinity;\n    var result = {computed : -Infinity, value: -Infinity};\n    each(obj, function(value, index, list) {\n      var computed = iterator ? iterator.call(context, value, index, list) : value;\n      computed > result.computed && (result = {value : value, computed : computed});\n    });\n    return result.value;\n  };\n\n  // Return the minimum element (or element-based computation).\n  _.min = function(obj, iterator, context) {\n    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {\n      return Math.min.apply(Math, obj);\n    }\n    if (!iterator && _.isEmpty(obj)) return Infinity;\n    var result = {computed : Infinity, value: Infinity};\n    each(obj, function(value, index, list) {\n      var computed = iterator ? iterator.call(context, value, index, list) : value;\n      computed < result.computed && (result = {value : value, computed : computed});\n    });\n    return result.value;\n  };\n\n  // Shuffle an array, using the modern version of the \n  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).\n  _.shuffle = function(obj) {\n    var rand;\n    var index = 0;\n    var shuffled = [];\n    each(obj, function(value) {\n      rand = _.random(index++);\n      shuffled[index - 1] = shuffled[rand];\n      shuffled[rand] = value;\n    });\n    return shuffled;\n  };\n\n  // Sample **n** random values from an array.\n  // If **n** is not specified, returns a single random element from the array.\n  // The internal `guard` argument allows it to work with `map`.\n  _.sample = function(obj, n, guard) {\n    if (arguments.length < 2 || guard) {\n      return obj[_.random(obj.length - 1)];\n    }\n    return _.shuffle(obj).slice(0, Math.max(0, n));\n  };\n\n  // An internal function to generate lookup iterators.\n  var lookupIterator = function(value) {\n    return _.isFunction(value) ? value : function(obj){ return obj[value]; };\n  };\n\n  // Sort the object's values by a criterion produced by an iterator.\n  _.sortBy = function(obj, value, context) {\n    var iterator = lookupIterator(value);\n    return _.pluck(_.map(obj, function(value, index, list) {\n      return {\n        value: value,\n        index: index,\n        criteria: iterator.call(context, value, index, list)\n      };\n    }).sort(function(left, right) {\n      var a = left.criteria;\n      var b = right.criteria;\n      if (a !== b) {\n        if (a > b || a === void 0) return 1;\n        if (a < b || b === void 0) return -1;\n      }\n      return left.index - right.index;\n    }), 'value');\n  };\n\n  // An internal function used for aggregate \"group by\" operations.\n  var group = function(behavior) {\n    return function(obj, value, context) {\n      var result = {};\n      var iterator = value == null ? _.identity : lookupIterator(value);\n      each(obj, function(value, index) {\n        var key = iterator.call(context, value, index, obj);\n        behavior(result, key, value);\n      });\n      return result;\n    };\n  };\n\n  // Groups the object's values by a criterion. Pass either a string attribute\n  // to group by, or a function that returns the criterion.\n  _.groupBy = group(function(result, key, value) {\n    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);\n  });\n\n  // Indexes the object's values by a criterion, similar to `groupBy`, but for\n  // when you know that your index values will be unique.\n  _.indexBy = group(function(result, key, value) {\n    result[key] = value;\n  });\n\n  // Counts instances of an object that group by a certain criterion. Pass\n  // either a string attribute to count by, or a function that returns the\n  // criterion.\n  _.countBy = group(function(result, key) {\n    _.has(result, key) ? result[key]++ : result[key] = 1;\n  });\n\n  // Use a comparator function to figure out the smallest index at which\n  // an object should be inserted so as to maintain order. Uses binary search.\n  _.sortedIndex = function(array, obj, iterator, context) {\n    iterator = iterator == null ? _.identity : lookupIterator(iterator);\n    var value = iterator.call(context, obj);\n    var low = 0, high = array.length;\n    while (low < high) {\n      var mid = (low + high) >>> 1;\n      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;\n    }\n    return low;\n  };\n\n  // Safely create a real, live array from anything iterable.\n  _.toArray = function(obj) {\n    if (!obj) return [];\n    if (_.isArray(obj)) return slice.call(obj);\n    if (obj.length === +obj.length) return _.map(obj, _.identity);\n    return _.values(obj);\n  };\n\n  // Return the number of elements in an object.\n  _.size = function(obj) {\n    if (obj == null) return 0;\n    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;\n  };\n\n  // Array Functions\n  // ---------------\n\n  // Get the first element of an array. Passing **n** will return the first N\n  // values in the array. Aliased as `head` and `take`. The **guard** check\n  // allows it to work with `_.map`.\n  _.first = _.head = _.take = function(array, n, guard) {\n    if (array == null) return void 0;\n    return (n == null) || guard ? array[0] : slice.call(array, 0, n);\n  };\n\n  // Returns everything but the last entry of the array. Especially useful on\n  // the arguments object. Passing **n** will return all the values in\n  // the array, excluding the last N. The **guard** check allows it to work with\n  // `_.map`.\n  _.initial = function(array, n, guard) {\n    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));\n  };\n\n  // Get the last element of an array. Passing **n** will return the last N\n  // values in the array. The **guard** check allows it to work with `_.map`.\n  _.last = function(array, n, guard) {\n    if (array == null) return void 0;\n    if ((n == null) || guard) {\n      return array[array.length - 1];\n    } else {\n      return slice.call(array, Math.max(array.length - n, 0));\n    }\n  };\n\n  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.\n  // Especially useful on the arguments object. Passing an **n** will return\n  // the rest N values in the array. The **guard**\n  // check allows it to work with `_.map`.\n  _.rest = _.tail = _.drop = function(array, n, guard) {\n    return slice.call(array, (n == null) || guard ? 1 : n);\n  };\n\n  // Trim out all falsy values from an array.\n  _.compact = function(array) {\n    return _.filter(array, _.identity);\n  };\n\n  // Internal implementation of a recursive `flatten` function.\n  var flatten = function(input, shallow, output) {\n    if (shallow && _.every(input, _.isArray)) {\n      return concat.apply(output, input);\n    }\n    each(input, function(value) {\n      if (_.isArray(value) || _.isArguments(value)) {\n        shallow ? push.apply(output, value) : flatten(value, shallow, output);\n      } else {\n        output.push(value);\n      }\n    });\n    return output;\n  };\n\n  // Flatten out an array, either recursively (by default), or just one level.\n  _.flatten = function(array, shallow) {\n    return flatten(array, shallow, []);\n  };\n\n  // Return a version of the array that does not contain the specified value(s).\n  _.without = function(array) {\n    return _.difference(array, slice.call(arguments, 1));\n  };\n\n  // Produce a duplicate-free version of the array. If the array has already\n  // been sorted, you have the option of using a faster algorithm.\n  // Aliased as `unique`.\n  _.uniq = _.unique = function(array, isSorted, iterator, context) {\n    if (_.isFunction(isSorted)) {\n      context = iterator;\n      iterator = isSorted;\n      isSorted = false;\n    }\n    var initial = iterator ? _.map(array, iterator, context) : array;\n    var results = [];\n    var seen = [];\n    each(initial, function(value, index) {\n      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {\n        seen.push(value);\n        results.push(array[index]);\n      }\n    });\n    return results;\n  };\n\n  // Produce an array that contains the union: each distinct element from all of\n  // the passed-in arrays.\n  _.union = function() {\n    return _.uniq(_.flatten(arguments, true));\n  };\n\n  // Produce an array that contains every item shared between all the\n  // passed-in arrays.\n  _.intersection = function(array) {\n    var rest = slice.call(arguments, 1);\n    return _.filter(_.uniq(array), function(item) {\n      return _.every(rest, function(other) {\n        return _.indexOf(other, item) >= 0;\n      });\n    });\n  };\n\n  // Take the difference between one array and a number of other arrays.\n  // Only the elements present in just the first array will remain.\n  _.difference = function(array) {\n    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));\n    return _.filter(array, function(value){ return !_.contains(rest, value); });\n  };\n\n  // Zip together multiple lists into a single array -- elements that share\n  // an index go together.\n  _.zip = function() {\n    var length = _.max(_.pluck(arguments, \"length\").concat(0));\n    var results = new Array(length);\n    for (var i = 0; i < length; i++) {\n      results[i] = _.pluck(arguments, '' + i);\n    }\n    return results;\n  };\n\n  // Converts lists into objects. Pass either a single array of `[key, value]`\n  // pairs, or two parallel arrays of the same length -- one of keys, and one of\n  // the corresponding values.\n  _.object = function(list, values) {\n    if (list == null) return {};\n    var result = {};\n    for (var i = 0, length = list.length; i < length; i++) {\n      if (values) {\n        result[list[i]] = values[i];\n      } else {\n        result[list[i][0]] = list[i][1];\n      }\n    }\n    return result;\n  };\n\n  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),\n  // we need this function. Return the position of the first occurrence of an\n  // item in an array, or -1 if the item is not included in the array.\n  // Delegates to **ECMAScript 5**'s native `indexOf` if available.\n  // If the array is large and already in sort order, pass `true`\n  // for **isSorted** to use binary search.\n  _.indexOf = function(array, item, isSorted) {\n    if (array == null) return -1;\n    var i = 0, length = array.length;\n    if (isSorted) {\n      if (typeof isSorted == 'number') {\n        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);\n      } else {\n        i = _.sortedIndex(array, item);\n        return array[i] === item ? i : -1;\n      }\n    }\n    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);\n    for (; i < length; i++) if (array[i] === item) return i;\n    return -1;\n  };\n\n  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.\n  _.lastIndexOf = function(array, item, from) {\n    if (array == null) return -1;\n    var hasIndex = from != null;\n    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {\n      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);\n    }\n    var i = (hasIndex ? from : array.length);\n    while (i--) if (array[i] === item) return i;\n    return -1;\n  };\n\n  // Generate an integer Array containing an arithmetic progression. A port of\n  // the native Python `range()` function. See\n  // [the Python documentation](http://docs.python.org/library/functions.html#range).\n  _.range = function(start, stop, step) {\n    if (arguments.length <= 1) {\n      stop = start || 0;\n      start = 0;\n    }\n    step = arguments[2] || 1;\n\n    var length = Math.max(Math.ceil((stop - start) / step), 0);\n    var idx = 0;\n    var range = new Array(length);\n\n    while(idx < length) {\n      range[idx++] = start;\n      start += step;\n    }\n\n    return range;\n  };\n\n  // Function (ahem) Functions\n  // ------------------\n\n  // Reusable constructor function for prototype setting.\n  var ctor = function(){};\n\n  // Create a function bound to a given object (assigning `this`, and arguments,\n  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if\n  // available.\n  _.bind = function(func, context) {\n    var args, bound;\n    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));\n    if (!_.isFunction(func)) throw new TypeError;\n    args = slice.call(arguments, 2);\n    return bound = function() {\n      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));\n      ctor.prototype = func.prototype;\n      var self = new ctor;\n      ctor.prototype = null;\n      var result = func.apply(self, args.concat(slice.call(arguments)));\n      if (Object(result) === result) return result;\n      return self;\n    };\n  };\n\n  // Partially apply a function by creating a version that has had some of its\n  // arguments pre-filled, without changing its dynamic `this` context.\n  _.partial = function(func) {\n    var args = slice.call(arguments, 1);\n    return function() {\n      return func.apply(this, args.concat(slice.call(arguments)));\n    };\n  };\n\n  // Bind all of an object's methods to that object. Useful for ensuring that\n  // all callbacks defined on an object belong to it.\n  _.bindAll = function(obj) {\n    var funcs = slice.call(arguments, 1);\n    if (funcs.length === 0) throw new Error(\"bindAll must be passed function names\");\n    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });\n    return obj;\n  };\n\n  // Memoize an expensive function by storing its results.\n  _.memoize = function(func, hasher) {\n    var memo = {};\n    hasher || (hasher = _.identity);\n    return function() {\n      var key = hasher.apply(this, arguments);\n      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));\n    };\n  };\n\n  // Delays a function for the given number of milliseconds, and then calls\n  // it with the arguments supplied.\n  _.delay = function(func, wait) {\n    var args = slice.call(arguments, 2);\n    return setTimeout(function(){ return func.apply(null, args); }, wait);\n  };\n\n  // Defers a function, scheduling it to run after the current call stack has\n  // cleared.\n  _.defer = function(func) {\n    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));\n  };\n\n  // Returns a function, that, when invoked, will only be triggered at most once\n  // during a given window of time. Normally, the throttled function will run\n  // as much as it can, without ever going more than once per `wait` duration;\n  // but if you'd like to disable the execution on the leading edge, pass\n  // `{leading: false}`. To disable execution on the trailing edge, ditto.\n  _.throttle = function(func, wait, options) {\n    var context, args, result;\n    var timeout = null;\n    var previous = 0;\n    options || (options = {});\n    var later = function() {\n      previous = options.leading === false ? 0 : new Date;\n      timeout = null;\n      result = func.apply(context, args);\n    };\n    return function() {\n      var now = new Date;\n      if (!previous && options.leading === false) previous = now;\n      var remaining = wait - (now - previous);\n      context = this;\n      args = arguments;\n      if (remaining <= 0) {\n        clearTimeout(timeout);\n        timeout = null;\n        previous = now;\n        result = func.apply(context, args);\n      } else if (!timeout && options.trailing !== false) {\n        timeout = setTimeout(later, remaining);\n      }\n      return result;\n    };\n  };\n\n  // Returns a function, that, as long as it continues to be invoked, will not\n  // be triggered. The function will be called after it stops being called for\n  // N milliseconds. If `immediate` is passed, trigger the function on the\n  // leading edge, instead of the trailing.\n  _.debounce = function(func, wait, immediate) {\n    var timeout, args, context, timestamp, result;\n    return function() {\n      context = this;\n      args = arguments;\n      timestamp = new Date();\n      var later = function() {\n        var last = (new Date()) - timestamp;\n        if (last < wait) {\n          timeout = setTimeout(later, wait - last);\n        } else {\n          timeout = null;\n          if (!immediate) result = func.apply(context, args);\n        }\n      };\n      var callNow = immediate && !timeout;\n      if (!timeout) {\n        timeout = setTimeout(later, wait);\n      }\n      if (callNow) result = func.apply(context, args);\n      return result;\n    };\n  };\n\n  // Returns a function that will be executed at most one time, no matter how\n  // often you call it. Useful for lazy initialization.\n  _.once = function(func) {\n    var ran = false, memo;\n    return function() {\n      if (ran) return memo;\n      ran = true;\n      memo = func.apply(this, arguments);\n      func = null;\n      return memo;\n    };\n  };\n\n  // Returns the first function passed as an argument to the second,\n  // allowing you to adjust arguments, run code before and after, and\n  // conditionally execute the original function.\n  _.wrap = function(func, wrapper) {\n    return function() {\n      var args = [func];\n      push.apply(args, arguments);\n      return wrapper.apply(this, args);\n    };\n  };\n\n  // Returns a function that is the composition of a list of functions, each\n  // consuming the return value of the function that follows.\n  _.compose = function() {\n    var funcs = arguments;\n    return function() {\n      var args = arguments;\n      for (var i = funcs.length - 1; i >= 0; i--) {\n        args = [funcs[i].apply(this, args)];\n      }\n      return args[0];\n    };\n  };\n\n  // Returns a function that will only be executed after being called N times.\n  _.after = function(times, func) {\n    return function() {\n      if (--times < 1) {\n        return func.apply(this, arguments);\n      }\n    };\n  };\n\n  // Object Functions\n  // ----------------\n\n  // Retrieve the names of an object's properties.\n  // Delegates to **ECMAScript 5**'s native `Object.keys`\n  _.keys = nativeKeys || function(obj) {\n    if (obj !== Object(obj)) throw new TypeError('Invalid object');\n    var keys = [];\n    for (var key in obj) if (_.has(obj, key)) keys.push(key);\n    return keys;\n  };\n\n  // Retrieve the values of an object's properties.\n  _.values = function(obj) {\n    var keys = _.keys(obj);\n    var length = keys.length;\n    var values = new Array(length);\n    for (var i = 0; i < length; i++) {\n      values[i] = obj[keys[i]];\n    }\n    return values;\n  };\n\n  // Convert an object into a list of `[key, value]` pairs.\n  _.pairs = function(obj) {\n    var keys = _.keys(obj);\n    var length = keys.length;\n    var pairs = new Array(length);\n    for (var i = 0; i < length; i++) {\n      pairs[i] = [keys[i], obj[keys[i]]];\n    }\n    return pairs;\n  };\n\n  // Invert the keys and values of an object. The values must be serializable.\n  _.invert = function(obj) {\n    var result = {};\n    var keys = _.keys(obj);\n    for (var i = 0, length = keys.length; i < length; i++) {\n      result[obj[keys[i]]] = keys[i];\n    }\n    return result;\n  };\n\n  // Return a sorted list of the function names available on the object.\n  // Aliased as `methods`\n  _.functions = _.methods = function(obj) {\n    var names = [];\n    for (var key in obj) {\n      if (_.isFunction(obj[key])) names.push(key);\n    }\n    return names.sort();\n  };\n\n  // Extend a given object with all the properties in passed-in object(s).\n  _.extend = function(obj) {\n    each(slice.call(arguments, 1), function(source) {\n      if (source) {\n        for (var prop in source) {\n          obj[prop] = source[prop];\n        }\n      }\n    });\n    return obj;\n  };\n\n  // Return a copy of the object only containing the whitelisted properties.\n  _.pick = function(obj) {\n    var copy = {};\n    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));\n    each(keys, function(key) {\n      if (key in obj) copy[key] = obj[key];\n    });\n    return copy;\n  };\n\n   // Return a copy of the object without the blacklisted properties.\n  _.omit = function(obj) {\n    var copy = {};\n    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));\n    for (var key in obj) {\n      if (!_.contains(keys, key)) copy[key] = obj[key];\n    }\n    return copy;\n  };\n\n  // Fill in a given object with default properties.\n  _.defaults = function(obj) {\n    each(slice.call(arguments, 1), function(source) {\n      if (source) {\n        for (var prop in source) {\n          if (obj[prop] === void 0) obj[prop] = source[prop];\n        }\n      }\n    });\n    return obj;\n  };\n\n  // Create a (shallow-cloned) duplicate of an object.\n  _.clone = function(obj) {\n    if (!_.isObject(obj)) return obj;\n    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);\n  };\n\n  // Invokes interceptor with the obj, and then returns obj.\n  // The primary purpose of this method is to \"tap into\" a method chain, in\n  // order to perform operations on intermediate results within the chain.\n  _.tap = function(obj, interceptor) {\n    interceptor(obj);\n    return obj;\n  };\n\n  // Internal recursive comparison function for `isEqual`.\n  var eq = function(a, b, aStack, bStack) {\n    // Identical objects are equal. `0 === -0`, but they aren't identical.\n    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).\n    if (a === b) return a !== 0 || 1 / a == 1 / b;\n    // A strict comparison is necessary because `null == undefined`.\n    if (a == null || b == null) return a === b;\n    // Unwrap any wrapped objects.\n    if (a instanceof _) a = a._wrapped;\n    if (b instanceof _) b = b._wrapped;\n    // Compare `[[Class]]` names.\n    var className = toString.call(a);\n    if (className != toString.call(b)) return false;\n    switch (className) {\n      // Strings, numbers, dates, and booleans are compared by value.\n      case '[object String]':\n        // Primitives and their corresponding object wrappers are equivalent; thus, `\"5\"` is\n        // equivalent to `new String(\"5\")`.\n        return a == String(b);\n      case '[object Number]':\n        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for\n        // other numeric values.\n        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);\n      case '[object Date]':\n      case '[object Boolean]':\n        // Coerce dates and booleans to numeric primitive values. Dates are compared by their\n        // millisecond representations. Note that invalid dates with millisecond representations\n        // of `NaN` are not equivalent.\n        return +a == +b;\n      // RegExps are compared by their source patterns and flags.\n      case '[object RegExp]':\n        return a.source == b.source &&\n               a.global == b.global &&\n               a.multiline == b.multiline &&\n               a.ignoreCase == b.ignoreCase;\n    }\n    if (typeof a != 'object' || typeof b != 'object') return false;\n    // Assume equality for cyclic structures. The algorithm for detecting cyclic\n    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.\n    var length = aStack.length;\n    while (length--) {\n      // Linear search. Performance is inversely proportional to the number of\n      // unique nested structures.\n      if (aStack[length] == a) return bStack[length] == b;\n    }\n    // Objects with different constructors are not equivalent, but `Object`s\n    // from different frames are.\n    var aCtor = a.constructor, bCtor = b.constructor;\n    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&\n                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {\n      return false;\n    }\n    // Add the first object to the stack of traversed objects.\n    aStack.push(a);\n    bStack.push(b);\n    var size = 0, result = true;\n    // Recursively compare objects and arrays.\n    if (className == '[object Array]') {\n      // Compare array lengths to determine if a deep comparison is necessary.\n      size = a.length;\n      result = size == b.length;\n      if (result) {\n        // Deep compare the contents, ignoring non-numeric properties.\n        while (size--) {\n          if (!(result = eq(a[size], b[size], aStack, bStack))) break;\n        }\n      }\n    } else {\n      // Deep compare objects.\n      for (var key in a) {\n        if (_.has(a, key)) {\n          // Count the expected number of properties.\n          size++;\n          // Deep compare each member.\n          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;\n        }\n      }\n      // Ensure that both objects contain the same number of properties.\n      if (result) {\n        for (key in b) {\n          if (_.has(b, key) && !(size--)) break;\n        }\n        result = !size;\n      }\n    }\n    // Remove the first object from the stack of traversed objects.\n    aStack.pop();\n    bStack.pop();\n    return result;\n  };\n\n  // Perform a deep comparison to check if two objects are equal.\n  _.isEqual = function(a, b) {\n    return eq(a, b, [], []);\n  };\n\n  // Is a given array, string, or object empty?\n  // An \"empty\" object has no enumerable own-properties.\n  _.isEmpty = function(obj) {\n    if (obj == null) return true;\n    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;\n    for (var key in obj) if (_.has(obj, key)) return false;\n    return true;\n  };\n\n  // Is a given value a DOM element?\n  _.isElement = function(obj) {\n    return !!(obj && obj.nodeType === 1);\n  };\n\n  // Is a given value an array?\n  // Delegates to ECMA5's native Array.isArray\n  _.isArray = nativeIsArray || function(obj) {\n    return toString.call(obj) == '[object Array]';\n  };\n\n  // Is a given variable an object?\n  _.isObject = function(obj) {\n    return obj === Object(obj);\n  };\n\n  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.\n  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {\n    _['is' + name] = function(obj) {\n      return toString.call(obj) == '[object ' + name + ']';\n    };\n  });\n\n  // Define a fallback version of the method in browsers (ahem, IE), where\n  // there isn't any inspectable \"Arguments\" type.\n  if (!_.isArguments(arguments)) {\n    _.isArguments = function(obj) {\n      return !!(obj && _.has(obj, 'callee'));\n    };\n  }\n\n  // Optimize `isFunction` if appropriate.\n  if (true) {\n    _.isFunction = function(obj) {\n      return typeof obj === 'function';\n    };\n  }\n\n  // Is a given object a finite number?\n  _.isFinite = function(obj) {\n    return isFinite(obj) && !isNaN(parseFloat(obj));\n  };\n\n  // Is the given value `NaN`? (NaN is the only number which does not equal itself).\n  _.isNaN = function(obj) {\n    return _.isNumber(obj) && obj != +obj;\n  };\n\n  // Is a given value a boolean?\n  _.isBoolean = function(obj) {\n    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';\n  };\n\n  // Is a given value equal to null?\n  _.isNull = function(obj) {\n    return obj === null;\n  };\n\n  // Is a given variable undefined?\n  _.isUndefined = function(obj) {\n    return obj === void 0;\n  };\n\n  // Shortcut function for checking if an object has a given property directly\n  // on itself (in other words, not on a prototype).\n  _.has = function(obj, key) {\n    return hasOwnProperty.call(obj, key);\n  };\n\n  // Utility Functions\n  // -----------------\n\n  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its\n  // previous owner. Returns a reference to the Underscore object.\n  _.noConflict = function() {\n    root._ = previousUnderscore;\n    return this;\n  };\n\n  // Keep the identity function around for default iterators.\n  _.identity = function(value) {\n    return value;\n  };\n\n  // Run a function **n** times.\n  _.times = function(n, iterator, context) {\n    var accum = Array(Math.max(0, n));\n    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);\n    return accum;\n  };\n\n  // Return a random integer between min and max (inclusive).\n  _.random = function(min, max) {\n    if (max == null) {\n      max = min;\n      min = 0;\n    }\n    return min + Math.floor(Math.random() * (max - min + 1));\n  };\n\n  // List of HTML entities for escaping.\n  var entityMap = {\n    escape: {\n      '&': '&amp;',\n      '<': '&lt;',\n      '>': '&gt;',\n      '\"': '&quot;',\n      \"'\": '&#x27;'\n    }\n  };\n  entityMap.unescape = _.invert(entityMap.escape);\n\n  // Regexes containing the keys and values listed immediately above.\n  var entityRegexes = {\n    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),\n    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')\n  };\n\n  // Functions for escaping and unescaping strings to/from HTML interpolation.\n  _.each(['escape', 'unescape'], function(method) {\n    _[method] = function(string) {\n      if (string == null) return '';\n      return ('' + string).replace(entityRegexes[method], function(match) {\n        return entityMap[method][match];\n      });\n    };\n  });\n\n  // If the value of the named `property` is a function then invoke it with the\n  // `object` as context; otherwise, return it.\n  _.result = function(object, property) {\n    if (object == null) return void 0;\n    var value = object[property];\n    return _.isFunction(value) ? value.call(object) : value;\n  };\n\n  // Add your own custom functions to the Underscore object.\n  _.mixin = function(obj) {\n    each(_.functions(obj), function(name) {\n      var func = _[name] = obj[name];\n      _.prototype[name] = function() {\n        var args = [this._wrapped];\n        push.apply(args, arguments);\n        return result.call(this, func.apply(_, args));\n      };\n    });\n  };\n\n  // Generate a unique integer id (unique within the entire client session).\n  // Useful for temporary DOM ids.\n  var idCounter = 0;\n  _.uniqueId = function(prefix) {\n    var id = ++idCounter + '';\n    return prefix ? prefix + id : id;\n  };\n\n  // By default, Underscore uses ERB-style template delimiters, change the\n  // following template settings to use alternative delimiters.\n  _.templateSettings = {\n    evaluate    : /<%([\\s\\S]+?)%>/g,\n    interpolate : /<%=([\\s\\S]+?)%>/g,\n    escape      : /<%-([\\s\\S]+?)%>/g\n  };\n\n  // When customizing `templateSettings`, if you don't want to define an\n  // interpolation, evaluation or escaping regex, we need one that is\n  // guaranteed not to match.\n  var noMatch = /(.)^/;\n\n  // Certain characters need to be escaped so that they can be put into a\n  // string literal.\n  var escapes = {\n    \"'\":      \"'\",\n    '\\\\':     '\\\\',\n    '\\r':     'r',\n    '\\n':     'n',\n    '\\t':     't',\n    '\\u2028': 'u2028',\n    '\\u2029': 'u2029'\n  };\n\n  var escaper = /\\\\|'|\\r|\\n|\\t|\\u2028|\\u2029/g;\n\n  // JavaScript micro-templating, similar to John Resig's implementation.\n  // Underscore templating handles arbitrary delimiters, preserves whitespace,\n  // and correctly escapes quotes within interpolated code.\n  _.template = function(text, data, settings) {\n    var render;\n    settings = _.defaults({}, settings, _.templateSettings);\n\n    // Combine delimiters into one regular expression via alternation.\n    var matcher = new RegExp([\n      (settings.escape || noMatch).source,\n      (settings.interpolate || noMatch).source,\n      (settings.evaluate || noMatch).source\n    ].join('|') + '|$', 'g');\n\n    // Compile the template source, escaping string literals appropriately.\n    var index = 0;\n    var source = \"__p+='\";\n    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {\n      source += text.slice(index, offset)\n        .replace(escaper, function(match) { return '\\\\' + escapes[match]; });\n\n      if (escape) {\n        source += \"'+\\n((__t=(\" + escape + \"))==null?'':_.escape(__t))+\\n'\";\n      }\n      if (interpolate) {\n        source += \"'+\\n((__t=(\" + interpolate + \"))==null?'':__t)+\\n'\";\n      }\n      if (evaluate) {\n        source += \"';\\n\" + evaluate + \"\\n__p+='\";\n      }\n      index = offset + match.length;\n      return match;\n    });\n    source += \"';\\n\";\n\n    // If a variable is not specified, place data values in local scope.\n    if (!settings.variable) source = 'with(obj||{}){\\n' + source + '}\\n';\n\n    source = \"var __t,__p='',__j=Array.prototype.join,\" +\n      \"print=function(){__p+=__j.call(arguments,'');};\\n\" +\n      source + \"return __p;\\n\";\n\n    try {\n      render = new Function(settings.variable || 'obj', '_', source);\n    } catch (e) {\n      e.source = source;\n      throw e;\n    }\n\n    if (data) return render(data, _);\n    var template = function(data) {\n      return render.call(this, data, _);\n    };\n\n    // Provide the compiled function source as a convenience for precompilation.\n    template.source = 'function(' + (settings.variable || 'obj') + '){\\n' + source + '}';\n\n    return template;\n  };\n\n  // Add a \"chain\" function, which will delegate to the wrapper.\n  _.chain = function(obj) {\n    return _(obj).chain();\n  };\n\n  // OOP\n  // ---------------\n  // If Underscore is called as a function, it returns a wrapped object that\n  // can be used OO-style. This wrapper holds altered versions of all the\n  // underscore functions. Wrapped objects may be chained.\n\n  // Helper function to continue chaining intermediate results.\n  var result = function(obj) {\n    return this._chain ? _(obj).chain() : obj;\n  };\n\n  // Add all of the Underscore functions to the wrapper object.\n  _.mixin(_);\n\n  // Add all mutator Array functions to the wrapper.\n  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {\n    var method = ArrayProto[name];\n    _.prototype[name] = function() {\n      var obj = this._wrapped;\n      method.apply(obj, arguments);\n      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];\n      return result.call(this, obj);\n    };\n  });\n\n  // Add all accessor Array functions to the wrapper.\n  each(['concat', 'join', 'slice'], function(name) {\n    var method = ArrayProto[name];\n    _.prototype[name] = function() {\n      return result.call(this, method.apply(this._wrapped, arguments));\n    };\n  });\n\n  _.extend(_.prototype, {\n\n    // Start chaining a wrapped Underscore object.\n    chain: function() {\n      this._chain = true;\n      return this;\n    },\n\n    // Extracts the result from a wrapped and chained object.\n    value: function() {\n      return this._wrapped;\n    }\n\n  });\n\n}).call(this);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ../~/underscore/underscore.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///../~/underscore/underscore.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("'use strict';\n\nexports.MainController = [\"$scope\", function ($scope) {\n    'ngInject';\n\n    $scope.title = 'Angular + Webpack';\n    $scope.greetings = 'Aleks\\'s Blog';\n}];\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/home/main.controller.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./app/home/main.controller.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("'use strict';\n\nexports.AuthController = [\"$scope\", function ($scope) {\n    'ngInject';\n\n    $scope.title = 'Authentification';\n}];\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/authentification/auth.controller.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./app/authentification/auth.controller.js?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("'use strict';\n\nexports.BlogController = [\"$scope\", \"GetJSON\", function ($scope, GetJSON) {\n    'ngInject';\n\n    var promise = GetJSON.getPosts();\n    $scope.counter = 0;\n\n    promise.then(function (data) {\n        data.posts.forEach(function (post) {\n            console.log(post.title);\n            $scope.counter++;\n            console.log('number of posts is ' + $scope.counter);\n        });\n        $scope.posts = data.posts;\n    }).catch(function (err) {\n        return console.log(err);\n    });\n\n    $scope.newPost = {\n        title: '',\n        body: '',\n        permalink: '',\n        author: '',\n        tags: [],\n        date: ''\n    };\n\n    $scope.writePost = function () {\n        $scope.newPost.date = Date.now();\n        $scope.posts.push($scope.newPost);\n        $scope.newPost = {\n            title: '',\n            body: '',\n            permalink: '',\n            author: '',\n            tags: [],\n            date: ''\n        };\n    };\n}];\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/blog/blog.controller.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./app/blog/blog.controller.js?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("'use strict';\n\nexports.GetJSON = [\"$q\", function ($q) {\n  'ngInject';\n\n  var deffered = $q.defer();\n  fetch('http://localhost:8000/blog/json').then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    return deffered.resolve(data);\n  }).catch(function (err) {\n    return console.log(err);\n  });\n  return {\n    getPosts: function getPosts() {\n      return deffered.promise;\n    }\n  };\n}];\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/blog/getJSON.service.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./app/blog/getJSON.service.js?");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nexports.titleCase = function () {\n  return function (val) {\n    return val ? val.replace(/\\w\\S*/g, function (txt) {\n      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();\n    }) : val;\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/newpost/title-case.filter.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./app/newpost/title-case.filter.js?");

/***/ }
/******/ ]);