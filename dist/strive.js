// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
	// Save the require from previous bundle to this closure if any
	var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
	var nodeRequire = typeof require === 'function' && require;

	function newRequire(name, jumped) {
		if (!cache[name]) {
			if (!modules[name]) {
				// if we cannot find the module within our internal map or
				// cache jump to the current global require ie. the last bundle
				// that was added to the page.
				var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
				if (!jumped && currentRequire) {
					return currentRequire(name, true);
				}

				// If there are other bundles on this page the require from the
				// previous one is saved to 'previousRequire'. Repeat this as
				// many times as there are bundles until the module is found or
				// we exhaust the require chain.
				if (previousRequire) {
					return previousRequire(name, true);
				}

				// Try the node require function if it exists.
				if (nodeRequire && typeof name === 'string') {
					return nodeRequire(name);
				}

				var err = new Error('Cannot find module \'' + name + '\'');
				err.code = 'MODULE_NOT_FOUND';
				throw err;
			}

			localRequire.resolve = resolve;
			localRequire.cache = {};

			var module = cache[name] = new newRequire.Module(name);

			modules[name][0].call(module.exports, localRequire, module, module.exports, this);
		}

		return cache[name].exports;

		function localRequire(x) {
			return newRequire(localRequire.resolve(x));
		}

		function resolve(x) {
			return modules[name][1][x] || x;
		}
	}

	function Module(moduleName) {
		this.id = moduleName;
		this.bundle = newRequire;
		this.exports = {};
	}

	newRequire.isParcelRequire = true;
	newRequire.Module = Module;
	newRequire.modules = modules;
	newRequire.cache = cache;
	newRequire.parent = previousRequire;
	newRequire.register = function (id, exports) {
		modules[id] = [function (require, module) {
			module.exports = exports;
		}, {}];
	};

	var error;
	for (var i = 0; i < entry.length; i++) {
		try {
			newRequire(entry[i]);
		} catch (e) {
			// Save first error but execute all entries
			if (!error) {
				error = e;
			}
		}
	}

	if (entry.length) {
		// Expose entry point to Node, AMD or browser globals
		// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
		var mainExports = newRequire(entry[entry.length - 1]);

		// CommonJS
		if (typeof exports === "object" && typeof module !== "undefined") {
			module.exports = mainExports;

			// RequireJS
		} else if (typeof define === "function" && define.amd) {
			define(function () {
				return mainExports;
			});

			// <script>
		} else if (globalName) {
			this[globalName] = mainExports;
		}
	}

	// Override the current require with this new one
	parcelRequire = newRequire;

	if (error) {
		// throw error from earlier, _after updating parcelRequire_
		throw error;
	}

	return newRequire;
})({
	"lib/movableCircle.ts": [function (require, module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var anyMoving = false;

		var MovableCircle =
			/** @class */
			function () {
				function MovableCircle(x, y, d) {
					var _this = this;

					this.mouseReleased = function () {
						anyMoving = false;
						_this.isMovable = false;
					};

					this.x = x;
					this.y = y;
					this.d = d;
					this.isMovable = false; //@ts-ignore

					_renderer.elt.addEventListener("mouseup", this.mouseReleased);
				}

				MovableCircle.prototype.draw = function () {
					push();

					if (this.isMouseHovering() || this.isMovable) {
						fill(255);
					}

					if (this.isMovable) {
						this.x += mouseX - pmouseX;
						this.y += mouseY - pmouseY;
					}

					circle(this.x, this.y, this.d);
					this.makeMovable();
					pop();
				};

				MovableCircle.prototype.isMouseHovering = function () {
					return dist(mouseX, mouseY, this.x, this.y) < this.d / 2;
				};

				MovableCircle.prototype.makeMovable = function () {
					if (this.isMouseHovering() && !anyMoving) {
						if (mouseIsPressed) {
							anyMoving = true;
							this.isMovable = true;
						}
					}
				};

				return MovableCircle;
			}();

		exports.default = MovableCircle;
	}, {}],
	"index.ts": [function (require, module, exports) {
		"use strict";

		var __importDefault = this && this.__importDefault || function (mod) {
			return mod && mod.__esModule ? mod : {
				"default": mod
			};
		};

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var movableCircle_1 = __importDefault(require("./lib/movableCircle"));

		var Strive =
			/** @class */
			function () {
				function Strive() {
				}

				Strive.createMovableCircle = function (x, y, d) {
					return new movableCircle_1.default(x, y, d);
				};

				Strive.drawTickAxes = function (lineColor, thickness, spacing, xoffset, yoffset) {
					if (lineColor === void 0) {
						lineColor = "rgb(20,45,217)";
					}

					if (thickness === void 0) {
						thickness = 3;
					}

					if (spacing === void 0) {
						spacing = 50;
					}

					if (xoffset === void 0) {
						xoffset = 0;
					}

					if (yoffset === void 0) {
						yoffset = 0;
					}

					push();
					translate(xoffset, yoffset);

					for (var i = 0; i < height; i += spacing) {
						//vertical tickmarks
						stroke(lineColor);
						strokeWeight(thickness);
						line(5, i, -5, i);
						line(5, -i, -5, -i); //horizontal tickmarks

						line(i, +5, i, -5);
						line(-i, +5, -i, -5);
						fill("white");
						noStroke();
						text(i, 16, i);
						text(-i, 16, -i);
						text(i, i, 16);
						text(-i, -i, 16);
						strokeWeight(0.25);
						stroke(color("rgba(255,255,255,0.6)"));
						line(i, -height, i, height);
						line(-i, -height, -i, height);
						line(-width, i, width, i);
						line(-width, -i, width, -i);
					}

					stroke(lineColor);
					strokeWeight(5); //horizontal line

					line(-width, 0, width, 0); //vertical line

					line(0, height, 0, -height);
					pop();
				};

				return Strive;
			}(); //@ts-ignore


		window.Strive = Strive;
	}, {"./lib/movableCircle": "lib/movableCircle.ts"}],
	"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js": [function (require, module, exports) {
		var global = arguments[3];
		var OVERLAY_ID = '__parcel__error__overlay__';
		var OldModule = module.bundle.Module;

		function Module(moduleName) {
			OldModule.call(this, moduleName);
			this.hot = {
				data: module.bundle.hotData,
				_acceptCallbacks: [],
				_disposeCallbacks: [],
				accept: function (fn) {
					this._acceptCallbacks.push(fn || function () {
					});
				},
				dispose: function (fn) {
					this._disposeCallbacks.push(fn);
				}
			};
			module.bundle.hotData = null;
		}

		module.bundle.Module = Module;
		var checkedAssets, assetsToAccept;
		var parent = module.bundle.parent;

		if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
			var hostname = "" || location.hostname;
			var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
			var ws = new WebSocket(protocol + '://' + hostname + ':' + "54618" + '/');

			ws.onmessage = function (event) {
				checkedAssets = {};
				assetsToAccept = [];
				var data = JSON.parse(event.data);

				if (data.type === 'update') {
					var handled = false;
					data.assets.forEach(function (asset) {
						if (!asset.isNew) {
							var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

							if (didAccept) {
								handled = true;
							}
						}
					}); // Enable HMR for CSS by default.

					handled = handled || data.assets.every(function (asset) {
						return asset.type === 'css' && asset.generated.js;
					});

					if (handled) {
						console.clear();
						data.assets.forEach(function (asset) {
							hmrApply(global.parcelRequire, asset);
						});
						assetsToAccept.forEach(function (v) {
							hmrAcceptRun(v[0], v[1]);
						});
					} else if (location.reload) {
						// `location` global exists in a web worker context but lacks `.reload()` function.
						location.reload();
					}
				}

				if (data.type === 'reload') {
					ws.close();

					ws.onclose = function () {
						location.reload();
					};
				}

				if (data.type === 'error-resolved') {
					console.log('[parcel] ✨ Error resolved');
					removeErrorOverlay();
				}

				if (data.type === 'error') {
					console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
					removeErrorOverlay();
					var overlay = createErrorOverlay(data);
					document.body.appendChild(overlay);
				}
			};
		}

		function removeErrorOverlay() {
			var overlay = document.getElementById(OVERLAY_ID);

			if (overlay) {
				overlay.remove();
			}
		}

		function createErrorOverlay(data) {
			var overlay = document.createElement('div');
			overlay.id = OVERLAY_ID; // html encode message and stack trace

			var message = document.createElement('div');
			var stackTrace = document.createElement('pre');
			message.innerText = data.error.message;
			stackTrace.innerText = data.error.stack;
			overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
			return overlay;
		}

		function getParents(bundle, id) {
			var modules = bundle.modules;

			if (!modules) {
				return [];
			}

			var parents = [];
			var k, d, dep;

			for (k in modules) {
				for (d in modules[k][1]) {
					dep = modules[k][1][d];

					if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
						parents.push(k);
					}
				}
			}

			if (bundle.parent) {
				parents = parents.concat(getParents(bundle.parent, id));
			}

			return parents;
		}

		function hmrApply(bundle, asset) {
			var modules = bundle.modules;

			if (!modules) {
				return;
			}

			if (modules[asset.id] || !bundle.parent) {
				var fn = new Function('require', 'module', 'exports', asset.generated.js);
				asset.isNew = !modules[asset.id];
				modules[asset.id] = [fn, asset.deps];
			} else if (bundle.parent) {
				hmrApply(bundle.parent, asset);
			}
		}

		function hmrAcceptCheck(bundle, id) {
			var modules = bundle.modules;

			if (!modules) {
				return;
			}

			if (!modules[id] && bundle.parent) {
				return hmrAcceptCheck(bundle.parent, id);
			}

			if (checkedAssets[id]) {
				return;
			}

			checkedAssets[id] = true;
			var cached = bundle.cache[id];
			assetsToAccept.push([bundle, id]);

			if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
				return true;
			}

			return getParents(global.parcelRequire, id).some(function (id) {
				return hmrAcceptCheck(global.parcelRequire, id);
			});
		}

		function hmrAcceptRun(bundle, id) {
			var cached = bundle.cache[id];
			bundle.hotData = {};

			if (cached) {
				cached.hot.data = bundle.hotData;
			}

			if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
				cached.hot._disposeCallbacks.forEach(function (cb) {
					cb(bundle.hotData);
				});
			}

			delete bundle.cache[id];
			bundle(id);
			cached = bundle.cache[id];

			if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
				cached.hot._acceptCallbacks.forEach(function (cb) {
					cb();
				});

				return true;
			}
		}
	}, {}]
}, {}, ["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js", "index.ts"], null)