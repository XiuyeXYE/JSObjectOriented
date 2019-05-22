/**
 * my dom handler API class level function is not equal with obj function. class
 * function cannot be called by obj!!! obj function cannot be called by class!!!
 */
(function (global, factory) {
	factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

	function notSupportMethod() {
		throw "function " + notSupportMethod.caller.name + " not supported by this document.";
	}
	var document = window.document;

	var XMLHttpRequest = window.XMLHttpRequest;

	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	var setTimeout = window.setTimeout;
	var clearTimeout = window.clearTimeout;

	// 这种方式是错误的!!!因为是引用,所以只想同一个
	// 不要定义静态变量赋初始值,否则容易出bug
	// const EMPTY_ARRAY = [];
	// const EMPTY_STRING = '';

	var EMPTY_VALUES = {};
	EMPTY_VALUES = Object.defineProperties(EMPTY_VALUES, {
		EMPTY_OBJECT: {
			get: function () {
				return {}
			}
		},
		EMPTY_ARRAY: {
			get: function () {
				return [];
			}
		},
		EMPTY_STRING: {
			get: function () {
				return '';
			}
		}

	});



	/**
	 * Utilities :
	 *
	 *
	 */



	function isBoolean(b) {
		return typeof b === 'boolean';
	}

	function isNumber(i) {
		return typeof i === 'number';
	}

	function isNull(s) {
		// 注意null==undefined:true
		// 所以用"==="
		return s === null;
	}

	function isUndefinded(s) {
		// 注意null==undefined:true
		// 所以用"==="
		return s === undefined;
	}

	function isStr(s) {
		return typeof s === 'string';
	}

	function isArray(a) {
		return Array.isArray(a);
	}

	function isFunction(f) {
		return typeof f === 'function';
	}

	function strIsEmpty(s) {
		return s.length == 0;
	}

	function strNonEmpty(s) {
		return isStr(s) && !strIsEmpty(s);
	}

	//手写！！容易出错和漏掉，还是用函数吧
	function fnExist(c) {
		return isFunction(c);
	}

	//手写！！容易出错和漏掉，还是用函数吧
	function oExist(o) {
		return o != null;
	}

	function defaultValue(o, defaultValue) {
		return o || defaultValue;
	}

	function str2ListBySeparator(s, separator) {
		if (strNonEmpty(s)) {
			return s.split(separator);
		}
		return EMPTY_VALUES.EMPTY_ARRAY;
	}

	function convertStr2ListByWs(s) {
		return str2ListBySeparator(s, /\s+/);
	}

	function list2StrWithJoint(a, joint) {

		if (isArray(a)) {
			return a.join(joint);
		}
		return EMPTY_VALUES.EMPTY_STRING;
	}

	function convertList2StrWithWs(a) {
		return list2StrWithJoint(a, ' ');
	}


	function arrayFilter(a, f) {
		if (isArray(a) && isFunction(f)) {
			var tmp = EMPTY_VALUES.EMPTY_ARRAY;
			for (var i = 0; i < a.length; i++) {
				if (f(a[i], i, a)) tmp.push(a[i]);
			}
			return tmp;
		}
		return EMPTY_VALUES.EMPTY_ARRAY;
	}

	function arrayForEach(a, f) {
		if (isArray(a) && isFunction(f)) {
			for (var i = 0; i < a.length; i++) {
				f(a[i], i, a);
			}
		} else {
			throw 'First param:array,second param:function!';
		}
	}


	function arrayMap(a, f) {
		var tmp = EMPTY_VALUES.EMPTY_ARRAY;

		arrayForEach(a, function (n, idx, arr) {
			tmp.push(f(n, idx, arr));
		});

		return tmp;
	}

	function arrayReduce(a, f) {
		if (isArray(a) && isFunction(f)) {

			var result = a[0];

			for (var i = 1; i < a.length; i++) {
				result = f(result, a[i], i - 1, i, a);
			}
			return result;
		}
		else {
			throw 'First param:array,second param:function!';
		}
	}

	function shallowCopyObj(dest, src) {
		var pNum = arguments.length;
		if (pNum == 0) {
			return EMPTY_VALUES.EMPTY_OBJECT;
		}
		else if (pNum == 2) {
			for (var key in src) {
				dest[key] = src[key];
			}
		} else {// >2
			for (var i = 1; i < pNum; i++) {
				dest = shallowCopyObj(dest, arguments[i]);
			}
		}


		return dest;

	}


	function p0(arr) {
		return arr.length == 0;
	}

	function pgt0(arr) {
		return arr.length > 0;
	}
	// not less than:>=
	function pnl0(arr) {
		return arr.length > 0;
	}

	function p1(arr) {
		return arr.length == 1;
	}

	function pnl1(arr) {
		return arr.length >= 1;
	}

	function p2(arr) {
		return arr.length == 2;
	}
	function p3(arr) {
		return arr.length == 3;
	}
	function pgt2(arr) {
		return arr.length > 2;
	}
	function pgt3(arr) {
		return arr.length > 3;
	}
	// not less than : >=
	function pnl2(arr) {
		return arr.length >= 2;
	}

	function pnl3(arr) {
		return arr.length >= 3;
	}

	function checkNumberType(a) {
		if (p1(arguments)) {
			if (!isNumber(a)) throw 'params must be number!';
		}
		else if (pnl2(arguments)) {
			for (var i = 0; i < arguments.length; i++) {
				checkNumberType(arguments[i]);
			}
		}
		return true;
	}

	function gt(a, b) {
		checkNumberType(a, b);
		return a > b;
	}

	function lt(a, b) {
		checkNumberType(a, b);
		return a < b;
	}

	function eq(a, b) {
		checkNumberType(a, b);
		return a === b;
	}

	function notInstanceof(o, c, msg) {
		if (!(o instanceof c)) {
			throw msg;
		}
	}

	/**
	 * End.
	 */



	/**
	 * public static methods:
	 *
	 */

	// var of_interface = {
	// 	valueOf: function (d) {
	// 		return new this(d);
	// 	},
	// 	of: function (d) {
	// 		return this.valueOf(d);
	// 	},

	// };
	//es6 new feature ...args
	var of_interface = {
		valueOf: function (...d) {
			return new this(...d);
		},
		of: function (...d) {
			return this.valueOf(...d);
		},

	};

	var extend_interface = {

		extend: function () {
			for (var i = 0; i < arguments.length; i++) {
				shallowCopyObj(this, arguments[i]);
			}
		},

	};

	/**
	 * end.
	 */

	/**
	 * class definition
	 * @param obj 
	 */

	function option(obj) {
		notInstanceof(this, option, 'option is an class,have to use "new"!');
		// this.value = obj;
		Object.defineProperty(this, 'value', {
			value: obj,
			// default
			// configurable:false,
			// writable:false,
		});
		this.get = function () {
			return this.value;
		};
		this.ifPresent = function (f) {
			if (isFunction(f)) {
				if (this.ifPresent()) {
					f(this.value);
				}
			}
			return oExist(this.value);
		};
	}

	shallowCopyObj(option, of_interface);
	shallowCopyObj(option, extend_interface);
	shallowCopyObj(option.prototype, extend_interface);

	option = Object.defineProperties(option, {
		EMPTY_OBJECT: {
			get: function () {
				return option.of(EMPTY_VALUES.EMPTY_OBJECT);
			}
		},
		EMPTY_ARRAY: {
			get: function () {
				return option.of(EMPTY_VALUES.EMPTY_ARRAY);
			}
		},
		EMPTY_STRING: {
			get: function () {
				return option.of(EMPTY_VALUES.EMPTY_STRING);
			}
		},
		EMPTY_OPTION: {
			value: option.of(null)
		}
	});


	function query(d, selector) {
		var elems = d.querySelectorAll(selector);

		if (pnl2(elems)) {
			return domlist.of(elems);
		}

		return dom.of(elems[0]);
	}


	function dom(node) {
		notInstanceof(this, dom, 'dom is an class,have to use "new"!');
		this.node = node;
	};


	shallowCopyObj(dom, of_interface);
	shallowCopyObj(dom, extend_interface);
	shallowCopyObj(dom.prototype, extend_interface);

	var dom_prototype_extend = {

		d: function (selector) {
			return query(this.node, selector);
		},



		exist: function () {
			return oExist(this.node);
		},

		isList: function () {
			return false;
		},

		get: function () {
			return this.node;
		},

		//
		attr: function (k, v) {
			if (arguments.length == 0) {
				throw "less than one parameter!";
			} else if (arguments.length == 1) {
				if (oExist(this.node) && fnExist(this.node.getAttribute)) {
					return this.node.getAttribute(k);
				}
				return EMPTY_VALUES.EMPTY_STRING;
			} else if (arguments.length >= 2) {
				if (oExist(this.node) && fnExist(this.node.setAttribute)) {
					this.node.setAttribute(k, v);
				}
				return this;
			}
		},
		// 变量元素自身的属性,终归不太好,弃用
		// css : function(k, v) {
		// if (arguments.length == 0) {
		// throw "less than one parameter!";
		// } else if (arguments.length == 1) {
		// return this.node.style[k];
		// } else if (arguments.length >= 2) {
		// this.node.style[k] = v;
		// }
		// },
		// 操作html元素的style属性
		css: function (k, v) {
			if (arguments.length == 0) {
				return str2ListBySeparator(this.attr('style'), /\s*;\s*/);
			} else if (arguments.length == 1) {
				var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = arrayFilter(cssExprs, function (cssExpr) {
					if (strNonEmpty(cssExpr) && cssExpr.indexOf(k) != -1) {
						return true;
					}
					else {
						return false;
					}
				});

				if (cssExprs.length >= 1) {
					var vs = EMPTY_VALUES.EMPTY_ARRAY;
					arrayForEach(cssExprs, function (cssExpr) {
						var cssKV = str2ListBySeparator(cssExpr, /\s*:\s*/);
						if (cssKV.length == 2) {
							vs.push(cssKV[1]);
						}
					});
					if (vs.length == 1) {
						return vs[0];
					}
					else if (vs.length > 1) {
						return vs;
					}
				}
				return EMPTY_VALUES.EMPTY_STRING;
			} else if (arguments.length >= 2) {
				var newCssExpr = k + ':' + v;
				var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = arrayFilter(cssExprs, function (cssExpr) {
					var cssKV = str2ListBySeparator(cssExpr, /\s*:\s*/);
					if (cssKV.length == 2) {
						return cssKV[0] !== k;
					}
					// <=>clear wrong css
					return false;
				});
				cssExprs.push(newCssExpr);
				return this.attr('style', list2StrWithJoint(cssExprs, ';'));
			}
		},
		cls: function (c, append = true) {
			if (arguments.length == 0) {
				return convertStr2ListByWs(this.attr('class'));
			}
			else if (isStr(c)) {
				// 如果是空字符串直接返回!
				if (strIsEmpty(c)) {
					return;
				}
				var classList = convertStr2ListByWs(this.attr('class'));
				classList = arrayFilter(classList,
					function (d) {
						return d !== c;
					});
				if (append) {
					classList.push(c);
				}
				var classStr = convertList2StrWithWs(classList);
				return this.attr('class', classStr);

			} else {
				throw 'First parameter must be string!';
			}
		}

	};



	//shallowCopyObj(dom.prototype, dom_prototype_extend);
	dom.prototype.extend(dom_prototype_extend);


	function domlist(nodeList) {
		notInstanceof(this, domlist, 'domlist is an class,have to use "new"!');
		// bug:!0 == true!!!
		if (!oExist(nodeList) || !isNumber(nodeList.length)) {
			throw 'cannot init this domlist,because of not html collection or list!';
		}
		var nlist = EMPTY_VALUES.EMPTY_ARRAY;
		for (var i = 0; i < nodeList.length; i++) {
			nlist[i] = new dom(nodeList[i]);
		}
		this.nodeList = nlist;
		shallowCopyObj(this, nlist);
		this.length = nlist.length;
	}


	shallowCopyObj(domlist, of_interface);
	shallowCopyObj(domlist, extend_interface);
	shallowCopyObj(domlist.prototype, extend_interface);

	var domlist_prototype_extend = {
		isList: function () {
			return true;
		},
		list: function () {
			return this.nodeList;
		},
		item: function (i) {
			return this.list()[i];
		},
		eq: function (i) {
			return this.item(i);
		},
		get: function (i) {
			return this.item(i).get();
		},
		forEach: function (f) {
			arrayForEach(this.list(), f);
		},
		filter: function (f) {
			return arrayFilter(this.list(), f);
		},
		map: function (f) {
			return arrayMap(this.list(), f);
		},
		reduce: function (f) {
			return arrayReduce(this.list(), f);
		},
		attr: function (k, v) {
			if (p0(arguments)) {
				throw "less than one parameter!";
			}
			else if (p1(arguments)) {
				var attrs = EMPTY_VALUES.EMPTY_ARRAY;
				for (var i = 0; i < this.nodeList.length; i++) {
					attrs.push(this.nodeList[i].attr(k));
				}
				return attrs;
			} else if (pnl2(arguments)) {
				for (var i = 0; i < this.nodeList.length; i++) {
					this.nodeList[i].attr(k, v);
				}
				return this;
			}
		},
		css: function (k, v) {
			if (p0(arguments)) {
				var csses = EMPTY_VALUES.EMPTY_ARRAY;
				for (var i = 0; i < this.nodeList.length; i++) {
					csses.push(this.nodeList[i].css());
				}
				return csses;
			}
			else if (p1(arguments)) {
				var csses = EMPTY_VALUES.EMPTY_ARRAY;
				for (var i = 0; i < this.nodeList.length; i++) {
					csses.push(this.nodeList[i].css(k));
				}
				return csses;
			} else if (pnl2(arguments)) {
				for (var i = 0; i < this.nodeList.length; i++) {
					this.nodeList[i].css(k, v);
				}
				return this;
			}
		},
		cls: function (c, append = true) {
			if (p0(arguments)) {
				var clses = EMPTY_VALUES.EMPTY_ARRAY;
				for (var i = 0; i < this.nodeList.length; i++) {
					clses.push(this.nodeList[i].cls());
				}
				return clses;
			}
			else if (isStr(c)) {
				// 如果是空字符串直接返回!
				if (strIsEmpty(c)) {
					return;
				}

				for (var i = 0; i < this.nodeList.length; i++) {
					this.nodeList[i].cls(c, append);
				}
				return this;
			} else {
				throw 'First parameter must be string!';
			}
		}
	};

	//shallowCopyObj(domlist.prototype, domlist_prototype_extend);

	domlist.prototype.extend(domlist_prototype_extend);

	// 为了解决和jQuery等框架的冲突，必须是函数，真操蛋！！！
	// xy 是对外开放的接口API
	var xy = function (p) {
		if (isFunction(p)) {
			dom.of(document).on('DOMContentLoaded', p);
		}
	};

	shallowCopyObj(xy, of_interface);
	shallowCopyObj(xy, extend_interface);


	var fn = {


		// 根据元素ID找到html对象
		byId: function (id) {
			return dom.of(document.getElementById(id));
		},
		byTag: function (tag) {
			return domlist.of(document.getElementsByTagName(tag));
		},
		byClass: function (cls) {
			return domlist.of(document.getElementsByClassName(cls));
		},

		byName: function (n) {
			return domlist.of(document.getElementsByName(n));
		},

		d: function (selector) {

			return query(document, selector);

		},

		defaultValue: defaultValue,


		// 把空格字符串拆分成数组
		convertStr2ListByWs: convertStr2ListByWs,
		// 把字符串数组合并字符串
		convertList2StrWithWs: convertList2StrWithWs,
		// 过滤数组生成新的数组
		arrayFilter: arrayFilter,
		arrayMap: arrayMap,
		arrayReduce: arrayReduce,
		// 判断对象是否为空
		isNumber: isNumber,
		isNull: isNull,
		isArray: isArray,
		// 判断变量是否未定义
		isUndefinded: isUndefinded,
		// 判断变量是否是字符串
		isStr: isStr,
		isBoolean: isBoolean,
		// 判断字符串是否是为空
		strIsEmpty: strIsEmpty,
		// 非空字符串
		strNonEmpty: strNonEmpty,
		// 判断变量是否是函数
		isFunction: isFunction,
		// 根据指定符号拆分字符串成数组
		str2ListBySeparator: str2ListBySeparator,
		// 用指定符号合并字符串数组
		list2StrWithJoint: list2StrWithJoint,
		arrayForEach: arrayForEach,
		// 浅拷贝
		shallowCopyObj: shallowCopyObj,
		fnExist: fnExist,
		oExist: oExist,
	};

	// set xy static methods
	xy.extend(fn);

	// provide some Object with outer
	var fd = {
		Dom: dom,
		DomList: domlist,
		Option: option,
		EMPTY_VALUES: EMPTY_VALUES,
	};



	// set xy static fields
	xy.extend(fd);










	/**
	 *
	 * AJAX API
	 *
	 */

	var AJAX_TYPE = {
		TYPE_GET: 'GET',
		TYPE_POST: 'POST',
		TYPE_PUT: 'PUT',
		TYPE_DELETE: 'DELETE',
		DATA_TYPE_DEFAULT: '',
		DATA_TYPE_JSON: 'json',
		DATA_TYPE_TEXT: 'text',
		DATA_TYPE_BLOB: 'blob',
		DATA_TYPE_DOM: 'document',
		DATA_TYPE_BUFFER: 'arraybuffer'
	};



	function ajax() {
		notInstanceof(this, ajax, 'ajax is an class,have to use "new"!');
		if (fnExist(XMLHttpRequest)) {
			this.xhr = new XMLHttpRequest;
		}
	}



	shallowCopyObj(ajax, of_interface);
	shallowCopyObj(ajax, extend_interface);
	shallowCopyObj(ajax.prototype, extend_interface);

	function createAjax() {
		return ajax.of();
	}

	ajax.extend(AJAX_TYPE);

	var ajax_prototype_extend = {
		exist: function () {
			return oExist(this.xhr);
		},
		q: function (params) {
			if (this.exist()) {
				params = defaultValue(params, EMPTY_VALUES.EMPTY_OBJECT);
				var url = defaultValue(params.url, EMPTY_VALUES.EMPTY_STRING);
				var data = params.data;
				var method = defaultValue(params.type, AJAX_TYPE.TYPE_GET);
				var success = params.success;
				var error = params.error;
				var dataType = defaultValue(params.dataType, AJAX_TYPE.DATA_TYPE_DEFAULT);
				var headers = defaultValue(params.headers, EMPTY_VALUES.EMPTY_OBJECT);
				var async = defaultValue(params.async, true);


				this.xhr.open(method, url, async);
				for (var h in headers) {
					var v = headers[h];
					this.xhr.setRequestHeader(h, v);
				}
				this.xhr.responseType = dataType;

				if (fnExist(error)) {
					this.xhr.onerror = error;
				}

				this.xhr.onreadystatechange = function (e) {
					var xhrt = e.target;
					if (xhrt.readyState == XMLHttpRequest.DONE && xhrt.status == 200) {
						if (fnExist(success))
							success(xhrt.response, xhrt);
					}
				};
				this.xhr.send(data);
			}

		}
	};

	//shallowCopyObj(ajax.prototype, ajax_prototype_extend);
	ajax.prototype.extend(ajax_prototype_extend);

	// static methods
	var ajax_fn = {
		createAjax: createAjax,
		q: function (params) {
			var ajax = this.createAjax();
			ajax.q(params);
		},
	};


	// static fields
	var ajax_clses = {
		Ajax: ajax
	};

	xy.extend(ajax_clses, ajax_fn);







	/**
	 *
	 * End.
	 */



	/**
	 * event handler
	 *
	 */

	var dom_event_fn = {

		on: function (e, c) {
			if (pnl2(arguments) && isStr(e) && isFunction(c)) {
				if (oExist(this.node) && fnExist(this.node.addEventListener))
					this.node.addEventListener(e, c);
			}
		},
		off: function (e, c) {
			if (pnl2(arguments) && isStr(e) && isFunction(c)) {
				if (oExist(this.node) && fnExist(this.node.removeEventListener))
					this.node.removeEventListener(e, c);
			}
		},
		onEvent: function (e, c) {
			if (pnl2(arguments) && isStr(e) && isFunction(c)) {
				if (oExist(this.node)) {
					this.node['on' + e] = c;
				}
			}
		},
		trigger: function (e, d) {
			if (pnl1(arguments) && oExist(this.node) && fnExist(this.node.dispatchEvent))
				this.node.dispatchEvent(new CustomEvent(e, { detail: d }));
		},
		click: function (c, o = false) {
			if (p0(arguments)) {
				this.trigger('click');
			}
			else if (isFunction(c)) {
				if (isBoolean(o) && o) {
					this.node.onclick = c;
				}
				else {
					this.on('click', c);
				}
			}
			else {
				this.trigger('click', c);
			}
		}
	};


	dom.prototype.extend(dom_event_fn);


	var domlist_event_fn = {
		on: function (e, c) {
			this.forEach(function (n) {
				n.on(e, c);
			});
		},
		onEvent: function (e, c) {
			this.forEach(function (n) {
				n.onEvent(e, c);
			});
		},
		off: function (e, c) {
			this.forEach(function (n) {
				n.off(e, c);
			});
		},
		trigger: function (e, d) {
			if (pnl1(arguments)) {
				this.forEach(function (n) {
					n.trigger(e, d);
				});
			}
		},
		click: function (c, o = false) {
			if (p0(arguments)) {
				this.forEach(function (n) {
					n.click();
				});
			}
			else if (isFunction(c)) {
				this.forEach(function (n) {
					n.click(c, o);
				});
			}
			else {
				this.forEach(function (n) {
					n.click(c);
				});
			}
		}

	};

	domlist.prototype.extend(domlist_event_fn);


	/**
	 * global event handler
	 */
	var global_event_fn = {

		ready: function (f) {
			if (isFunction(f)) {
				// dom.of(document).on('DOMContentLoaded', f);
				this(f);
			}
		}

	};

	xy.extend(global_event_fn);


	/**
	 *
	 * end
	 */


	/**
	 * 
	 * dom/domlist
	 * API: html text value 
	 * 
	 */
	var dom_prototype_extend_2 = {
		html: function (h) {
			h = defaultValue(h, EMPTY_VALUES.EMPTY_STRING);
			if (this.exist()) {
				//bug: 不是所有的属性，都可以用这种方式检验属性啊
				//因为空字符串''也是false！！！
				//直接用吧，即可
				// if (!!this.node.innerHTML) {
				if (p0(arguments)) {
					return this.node.innerHTML;
				}
				this.node.innerHTML = h;
				// }
			}

		},
		text: function (t) {
			t = defaultValue(t, EMPTY_VALUES.EMPTY_STRING);
			if (this.exist()) {
				// if (!!this.node.innerText) {
				if (p0(arguments)) {
					return this.node.innerText;
				}
				this.node.innerText = t;
				// }
			}

		},
		//fix bug:var v and function v conflict!!!
		value: function (v) {
			v = defaultValue(v, EMPTY_VALUES.EMPTY_STRING);
			if (this.exist()) {
				if (p0(arguments)) {
					return this.attr('value');
				}
				this.attr('value', v);
			}
		}
	};

	dom.prototype.extend(dom_prototype_extend_2);

	var domlist_prototype_extend_2 = {
		html: function (h) {
			if (p0(arguments)) {
				var hs = this.map(function (d) {
					return d.html();
				});
				return hs;
			}
			this.forEach(function (d) {
				d.html(h);
			});
		},
		text: function (t) {
			if (p0(arguments)) {
				var ts = this.map(function (d) {
					return d.text();
				});
				return ts;
			}
			this.forEach(function (d) {
				d.text(t);
			});
		},
		value: function (v) {
			if (p0(arguments)) {
				var vs = this.map(function (d) {
					return d.value();
				});
				return vs;
			}
			this.forEach(function (d) {
				d.value(v);
			});
		}
	};

	domlist.prototype.extend(domlist_prototype_extend_2);

	/**
	 * end.
	 * 
	 */

	/**
	 * 
	 * Dom API:
	 * 1.create html node
	 * 2.append 
	 * 3.remove
	 * ...
	 * xy:factory
	 * 
	 */

	var dom_static_extend_3 = {
		create: function (tag) {
			return this.of(document.createElement(tag));
		},
		// createFragment:function(){
		// 	return this.of(document.createDocumentFragment());
		// }
	};
	dom.extend(dom_static_extend_3);

	var dom_prototype_extend_3 = {
		append: function (d) {
			if (!(d instanceof dom)) {
				throw 'parameter 1 is not of type "Dom"';
			}
			if (this.exist() && d.exist()) {
				if (fnExist(this.node.appendChild)) {
					this.node.appendChild(d.node);
					return this;
				}
			}
		},
		remove: function (d) {
			if (!(d instanceof dom)) {
				throw 'parameter 1 is not of type "Dom"';
			}
			if (this.exist() && d.exist()) {
				if (fnExist(this.node.removeChild)) {
					this.node.removeChild(d.node);
					return this;
				}
			}

		},
		destroy: function () {
			if (this.exist()) {
				if (fnExist(this.node.remove)) {
					this.node.remove();
				}
			}
		},
		children: function () {
			var childs = EMPTY_VALUES.EMPTY_ARRAY;
			if (this.exist()) {
				this.node.children = defaultValue(this.node.children, EMPTY_VALUES.EMPTY_ARRAY);
				for (var i = 0; i < this.node.children.length; i++) {
					var child = this.node.children[i];
					childs.push(dom.of(child));
				}
			}
			return childs;
		},
		prev: function () {
			if (this.exist()) {
				return dom.of(this.node.previousElementSibling);
			}
		},
		next: function () {
			if (this.exist()) {
				return dom.of(this.node.nextElementSibling);
			}
		},
		parent: function () {
			if (this.exist()) {
				return dom.of(this.node.parentElement);
			}
		},
		before: function (d) {
			if (!(d instanceof dom)) {
				throw 'parameter 1 is not of type "Dom"';
			}
			if (this.exist() && d.exist()) {
				var p = d.parent();
				if (p.exist()) {
					p.node.insertBefore(this.node, d.node);
					return d;
				}
			}
		},
		after: function (d) {
			if (!(d instanceof dom)) {
				throw 'parameter 1 is not of type "Dom"';
			}
			if (this.exist() && d.exist()) {
				var p = d.parent();
				var n = d.next();

				if (p.exist()) {
					if (n.exist()) {
						this.before(n);
					}
					else {
						p.append(this);
					}
					return d;
				}
			}
		}
		// appendHtml:function(h){
		// 	if(this.exist()){
		// 		var frg = dom.createFragment();
		// 		frg.html(h);
		// 		this.append(frg);
		// 	}
		// }

	};

	dom.prototype.extend(dom_prototype_extend_3);

	var dom_handler_extend = {
		crt: function (tag) {
			return dom.create(tag);
		}
	};

	xy.extend(dom_handler_extend);

	/**
	 * 
	 * end.
	 * 
	 */
	/**
	 * Timer
	 * 
	 */

	var TIMER_STATUS = {
		NEW: 1,
		STARTING: 2,
		STARTED: 3,
		RUNNING: 4,
		RUN: 5,
		STOP: 6,
		STOPPED: 7
	};

	function timer(c, interval = 1000) {

		notInstanceof(this, timer, 'timer is an class,have to use "new"!');

		if (p0(arguments) || !isFunction(c)) {
			throw 'first param must be function!';
		}
		if (pnl2(arguments)) {
			this.params = EMPTY_VALUES.EMPTY_ARRAY;
			for (var i = 2; i < arguments.length; i++) {
				this.params.push(arguments[i]);
			}
		}
		this.run = c;
		this.interval = interval;

		var that = this;

		Object.defineProperty(this, 'status', {
			set: function (v) {
				that._status = v;
				switch (v) {
					//无效状态？
					case TIMER_STATUS.NEW:
						if (fnExist(that.onnew)) {
							that.onnew();
						}
						break;
					case TIMER_STATUS.STARTING:
						if (fnExist(that.onstarting)) {
							that.onstarting();
						}
						break;
					case TIMER_STATUS.STARTED:
						if (fnExist(that.onstarted)) {
							that.onstarted();
						}
						break;
					case TIMER_STATUS.RUNNING:
						if (fnExist(that.onrunning)) {
							that.onrunning();
						}
						break;
					case TIMER_STATUS.RUN:
						if (fnExist(that.onrun)) {
							that.onrun();
						}
						break;
					case TIMER_STATUS.STOP:
						if (fnExist(that.onstop)) {
							that.onstop();
						}
						break;
					case TIMER_STATUS.STOPPED:
						if (fnExist(that.onstopped)) {
							that.onstopped();
						}
						break;
				}
			},
			get: function () {
				return that._status;
			}
		});

		this.status = TIMER_STATUS.NEW;
	}

	shallowCopyObj(timer, of_interface);
	shallowCopyObj(timer, extend_interface);
	shallowCopyObj(timer.prototype, extend_interface);

	timer.extend(TIMER_STATUS);


	var timer_prototype_interfaces = {
		start: function () {
			if (fnExist(setTimeout)) {
				this.status = TIMER_STATUS.STARTING;
				var that = this;
				var timer_fn = function (p) {
					if (that.status === TIMER_STATUS.STOP) {
						that.releasePrevTimer();
						that.status = TIMER_STATUS.STOPPED;
					} else {
						that.status = TIMER_STATUS.RUNNING;
						that.run(p);
						that.status = TIMER_STATUS.RUN;
						that.releasePrevTimer();
						that.status = TIMER_STATUS.STARTING;
						that.id = setTimeout(timer_fn, that.interval, that.params);
						that.status = TIMER_STATUS.STARTED;
					}
				};
				this.id = setTimeout(timer_fn, this.interval, this.params);
				this.status = TIMER_STATUS.STARTED;
			}
			return this;
		},

		releasePrevTimer: function () {
			if (fnExist(clearTimeout)) {
				clearTimeout(this.id);
			}
			return this;
		},
		stop: function () {
			this.status = TIMER_STATUS.STOP;
			return this;
		}
	};

	timer.prototype.extend(timer_prototype_interfaces);


	/**
	 * thread
	 */
	var THREAD_STATUS = {
		RUNABLE: 1,
		STARTING: 2,
		STARTED: 3,
		RUNNING: 4,
		RUN: 5,
		STOPPED: 6,
	};


	function thread(c) {
		notInstanceof(this, thread, 'thread is an class,have to use "new"!');
		if (p0(arguments) || !isFunction(c)) {
			throw 'first param must be function!';
		}
		if (pnl1(arguments)) {
			this.params = EMPTY_VALUES.EMPTY_ARRAY;
			for (var i = 1; i < arguments.length; i++) {
				this.params.push(arguments[i]);
			}
		}
		this.run = c;
		this.delay = 0;
		var that = this;
		Object.defineProperty(this, 'status', {
			set: function (v) {
				that._status = v;
				switch (v) {
					//无效状态？
					case THREAD_STATUS.RUNABLE:
						if (fnExist(that.onrunable)) {
							that.onrunable();
						}
						break;
					case THREAD_STATUS.STARTING:
						if (fnExist(that.onstarting)) {
							that.onstarting();
						}
						break;
					case THREAD_STATUS.STARTED:
						if (fnExist(that.onstarted)) {
							that.onstarted();
						}
						break;
					case THREAD_STATUS.RUNNING:
						if (fnExist(that.onrunning)) {
							that.onrunning();
						}
						break;
					case THREAD_STATUS.RUN:
						if (fnExist(that.onrun)) {
							that.onrun();
						}
						break;
					case THREAD_STATUS.STOPPED:
						if (fnExist(that.onstopped)) {
							that.onstopped();
						}
						break;
				}
			},
			get: function () {
				return that._status;
			}
		});
		this.status = THREAD_STATUS.RUNABLE;
	}

	shallowCopyObj(thread, of_interface);
	shallowCopyObj(thread, extend_interface);
	shallowCopyObj(thread.prototype, extend_interface);

	thread.extend(THREAD_STATUS);

	//ms
	function sleep(n) {
		var s = new Date().getTime();
		var e = new Date().getTime();
		while (e < s + n) {
			e = new Date().getTime();
		}
		return e - s;
	}

	//setTimeout每次只有一个执行所以不能当做多线程!而且按创建的先后顺序执行!!!
	var thread_prototype_interfaces = {
		start: function () {

			if (fnExist(setTimeout)) {
				this.status = THREAD_STATUS.STARTING;
				var that = this;
				this.id = setTimeout(function (p) {
					that.status = THREAD_STATUS.RUNNING;
					that.run(p);
					that.status = THREAD_STATUS.RUN;
					that.status = THREAD_STATUS.STOPPED;
					that.release();
				}
					, this.delay, this.params);
				this.status = THREAD_STATUS.STARTED;
			}

			return this;
		},
		release: function () {
			if (fnExist(clearTimeout)) {
				clearTimeout(this.id);
			}
			return this;
		},
		sleep: function (n) {
			sleep(n);
		},
	};



	thread.prototype.extend(thread_prototype_interfaces);



	/**
	 * FPS
	 * 
	 */


	var FPS_STATUS = {
		READY: 1,
		STARTING: 2,
		STARTED: 3,
		RUNNING: 4,
		RUN: 5,
		STOP: 6,
		STOPPED: 7
	};


	function fps(c) {
		notInstanceof(this, fps, 'fps is class,have to use "new"');
		if (p0(arguments) || !isFunction(c)) {
			throw 'first param must be function!';
		}
		// if (pnl1(arguments)) {
		// 	this.params = EMPTY_VALUES.EMPTY_ARRAY;
		// 	for (var i = 1; i < arguments.length; i++) {
		// 		this.params.push(arguments[i]);
		// 	}
		// }
		this.run = c;

		var that = this;

		Object.defineProperty(this, 'status', {
			set: function (v) {
				that._status = v;
				switch (v) {
					//无效状态？
					case FPS_STATUS.READY:
						if (fnExist(that.onready)) {
							that.onready();
						}
						break;
					case FPS_STATUS.STARTING:
						if (fnExist(that.onstarting)) {
							that.onstarting();
						}
						break;
					case FPS_STATUS.STARTED:
						if (fnExist(that.onstarted)) {
							that.onstarted();
						}
						break;
					case FPS_STATUS.RUNNING:
						if (fnExist(that.onrunning)) {
							that.onrunning();
						}
						break;
					case FPS_STATUS.RUN:
						if (fnExist(that.onrun)) {
							that.onrun();
						}
						break;
					case FPS_STATUS.STOP:
						if (fnExist(that.onstop)) {
							that.onstop();
						}
						break;
					case FPS_STATUS.STOPPED:
						if (fnExist(that.onstopped)) {
							that.onstopped();
						}
						break;
				}
			},
			get: function () {
				return that._status;
			}
		});


		this.status = FPS_STATUS.READY;
	}

	shallowCopyObj(fps, of_interface);
	shallowCopyObj(fps, extend_interface);
	shallowCopyObj(fps.prototype, extend_interface);

	var fps_static_extend = {
		exec: function (c) {
			if (p0(arguments) || !isFunction(c)) {
				throw 'first param must be function!';
			}
			return this.of(c).exec();
		},
		loop: function (c) {
			if (p0(arguments) || !isFunction(c)) {
				throw 'first param must be function!';
			}
			return this.of(c).loop();
		}

	};

	fps.extend(fps_static_extend);

	var fps_prototype_extend = {
		loop: function () {

			if (fnExist(requestAnimationFrame)) {
				this.status = FPS_STATUS.STARTING;
				var that = this;
				var frame_fn = function (p) {
					if (that.status === FPS_STATUS.STOP) {
						that.cancel();
						this.status = FPS_STATUS.STOPPED;
					}
					else {
						that.status = FPS_STATUS.RUNNING;
						that.run(p);
						that.status = FPS_STATUS.RUN;
						that.cancel();
						that.status = FPS_STATUS.STARTING;
						that.id = requestAnimationFrame(frame_fn);
						that.status = FPS_STATUS.STARTED;
					}
				};
				this.id = requestAnimationFrame(frame_fn);
				this.status = FPS_STATUS.STARTED;
			}
			return this;
		},
		exec: function () {
			if (fnExist(requestAnimationFrame)) {
				this.status = FPS_STATUS.STARTING;
				var that = this;
				this.id = requestAnimationFrame(function (p) {
					that.status = FPS_STATUS.RUNNING;
					that.run(p);
					that.status = FPS_STATUS.RUN;
					that.cancel();
					that.status = FPS_STATUS.STOPPED;
				});
				this.status = FPS_STATUS.STARTED;
			}
			return this;
		},
		stop: function () {
			this.status = FPS_STATUS.STOP;
			return this;
		},
		cancel: function () {
			if (fnExist(cancelAnimationFrame)) {
				cancelAnimationFrame(this.id);
			}
			return this;
		}

	};

	fps.prototype.extend(fps_prototype_extend);



	xy.extend({
		Timer: timer,
		Thread: thread,
		FPS: fps,
		sleep: sleep
	});


	/**
	 * end.
	 * 
	 */








	window.xy = xy;
	return xy;
}));
