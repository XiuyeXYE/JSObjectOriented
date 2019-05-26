/**
 * my dom handler API class level function is not equal with obj function. class
 * function cannot be called by obj!!! obj function cannot be called by class!!!
 */
(function (global, factory) {
	factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

	//文档对象
	var document = window.document;
	//ajax 
	var XMLHttpRequest = window.XMLHttpRequest;
	//帧绘制回调
	var requestAnimationFrame = window.requestAnimationFrame;
	//删除
	var cancelAnimationFrame = window.cancelAnimationFrame;
	//定时器
	var setTimeout = window.setTimeout;
	//清理
	var clearTimeout = window.clearTimeout;

	// 这种方式是错误的!!!因为是引用,所以赋值只是同一个
	// 容易引起隐藏bug!
	// 不要定义静态变量赋初始值,否则容易出bug
	// const EMPTY_ARRAY = [];
	// const EMPTY_STRING = '';

	/**
	 * 正确的方式:是给每一个变量一个新对象!
	 * 默认空值
	 */
	var EMPTY_VALUES = {};
	//为了去重引用，返回每一个都是新对象
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
	 *	工具函数
	 *
	 */


	//check boolean
	function isBoolean(b) {
		return typeof b === 'boolean';
	}
	//check number,but not Number!!!Number is object.
	function isNumber(i) {
		return typeof i === 'number';
	}
	//check obj if null
	function isNull(s) {
		// 注意null==undefined:true
		// 所以用"==="
		return s === null;
	}
	//check undefined
	function isUndefinded(s) {
		// 注意null==undefined:true
		// 所以用"==="
		return s === undefined;
	}

	//check string,because of !!'' == false,so using 'typeof' .
	function isStr(s) {
		return typeof s === 'string';
	}
	//check array
	function isArray(a) {
		return Array.isArray(a);
	}
	//check function
	function isFunction(f) {
		return typeof f === 'function';
	}


	//手写！！容易出错和漏掉，还是用函数吧
	function fnExist(c) {
		return isFunction(c);
	}

	//手写！！容易出错和漏掉，还是用函数吧
	//undefined == null : true
	//undefined === null : false
	function oExist(o) {
		return o != null;
	}
	//check empty string
	function strIsEmpty(s) {
		return s.length == 0;
	}
	//not empty string
	function strNonEmpty(s) {
		return isStr(s) && !strIsEmpty(s);
	}


	//default value set
	function defaultValue(o, defaultValue) {
		return o || defaultValue;
	}

	//string to array using separator to split
	function str2ListBySeparator(s, separator) {
		if (strNonEmpty(s)) {
			return s.split(separator);
		}
		return EMPTY_VALUES.EMPTY_ARRAY;
	}

	//string to array using ' ' to split
	function convertStr2ListByWs(s) {
		return str2ListBySeparator(s, /\s+/);
	}

	//array to string using joint to link
	function list2StrWithJoint(a, joint) {

		if (isArray(a)) {
			return a.join(joint);
		}
		return EMPTY_VALUES.EMPTY_STRING;
	}

	//array to string using ' ' to link
	function convertList2StrWithWs(a) {
		return list2StrWithJoint(a, ' ');
	}

	//array filter
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
	//array for each
	function arrayForEach(a, f) {
		if (isArray(a) && isFunction(f)) {
			for (var i = 0; i < a.length; i++) {
				f(a[i], i, a);
			}
		} else {
			throw 'First param:array,second param:function!';
		}
	}

	//array map
	function arrayMap(a, f) {
		var tmp = EMPTY_VALUES.EMPTY_ARRAY;

		arrayForEach(a, function (n, idx, arr) {
			tmp.push(f(n, idx, arr));
		});

		return tmp;
	}
	//array reduce
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

	//copy obj
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

	//==0
	function p0(arr) {
		return arr.length == 0;
	}
	//>0
	function pgt0(arr) {
		return arr.length > 0;
	}
	// not less than:>=
	function pnl0(arr) {
		return arr.length >= 0;
	}
	//==1
	function p1(arr) {
		return arr.length == 1;
	}
	//>=1
	function pnl1(arr) {
		return arr.length >= 1;
	}

	function p2(arr) {
		return arr.length == 2;
	}
	function pl2(arr) {
		return arr.length < 2;
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
	//check multiple number type is?
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

	//适用任何类型
	function eq(a, b) {
		// checkNumberType(a, b);
		return a === b;
	}
	//o not instance of c,will raise exception!
	function notInstanceof(o, c, msg) {
		if (!(o instanceof c)) {
			throw msg;
		}
	}
	//between start and end!
	function openInterval(args, start, end) {
		return args.length > start && args.length < end;
	}
	function closedInterval(args, start, end) {
		return args.length >= start && args.length <= end;
	}



	//in general,self -> function.prototype  -> {} -> null
	//3 level
	//not extends constructor!
	//single inheritance
	function ext(dest, src) {
		if (isFunction(dest) && isFunction(src)) {
			//up search
			var methods_obj = dest.prototype;
			var sup = methods_obj.__proto__;
			var supLevel = 0;
			while (oExist(sup)) {
				sup = sup.__proto__;
				supLevel++;
			}
			if (gt(supLevel, 1)) {
				throw dest.name + ' cannot support multiple inheritance!';
			}
			//laste expr =
			//instanceof OK
			methods_obj.__proto__ = src.prototype;
			if (!fnExist(methods_obj.base)) {
				methods_obj.base = function () {//<=>super
					var f = methods_obj.__proto__;//super
					var fcon = f.costructor;
					fcon.apply(this, arguments);
				}
			}
			return dest;
		} else if (pnl2(arguments)) {
			var finalClass = dest;
			for (var i = arguments.length - 1; i > 1; i--) {
				finalClass = ext(arguments[i - 1], arguments[i]);
			}
			return finalClass;
		}
	}

	//implements interfaces
	function impl(d, i) {
		if (isFunction(d) && oExist(i)) {
			shallowCopyObj(d.prototype, i);
			return d;
		} else if (pnl2(arguments)) {
			var finalClass = dest;
			for (var i = arguments.length - 1; i > 1; i--) {
				finalClass = impl(arguments[i - 1], arguments[i]);
			}
			return finalClass;
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
		// valueOf: function (...d) {
		// 	return new this(...d);
		// },
		// of: function (...d) {
		// 	return this.valueOf(...d);
		// },
		valueOf: function () {
			var that = this;
			for (var i = 0; i < arguments.length; i++) {
				that = that.bind(this/*not useful*/, arguments[i]);
			}
			return new that();
		},
		of: function () {
			var that = this;
			for (var i = 0; i < arguments.length; i++) {
				that = that.bind(this/*not useful*/, arguments[i]);
			}
			return new that();
		},


	};
	//extend interface
	var extend_interface = {

		extend: function () {
			for (var i = 0; i < arguments.length; i++) {
				shallowCopyObj(this, arguments[i]);
			}
		},

	};

	/**
	 * 调用接口,
	 * 1."直接"调用底层对象的方法和属性.
	 * 2.直接根据上层方法调用底层相同方法名接口!相当于包装类
	 */
	var invoke_interface = {

		/**
		 * 设置默认原始对象!
		 */
		o: function (o) {
			this.origin = o;
		},
		/**
		 * 返回原始对象
		 */
		get: function () {
			return this.origin;
		},
		//tool beginning:
		/**
		 * 返回对象属性值
		 */
		k: function (key) {
			return this.get()[key];
		},
		/**
		 * 设置对象属性值
		 */
		kv: function (k, v) {
			this.get()[k] = v;
			return this;
		},

		/**
		 * arguments
		 * f arguments
		 * 这个函数还是相当危险的，搞不好会增加底层对象的属性！
		 * 总之这个很复杂啊，思路还不能理清。
		 * 如果不考虑容错性，很好写，但是为了够通用还是写写吧。
		 * @param {string|arguments} p0 
		 * @param {arguments} p1 
		 */
		property: function (p0, p1) {
			//left => right then right => left
			//like this:a.b.c => a.b => a then a=>a.b =>b.c
			//san yuan
			var key = this.property.caller && this.property.caller.name;
			var args = key && p0;
			key = p1 && p0 || key;
			args = (key == p0 && p1) || args;
			//er yuan
			key = key || p0;
			args = args || EMPTY_VALUES.EMPTY_ARRAY;
			if (isStr(args) || !oExist(args.length)) {//string, number,boolean,symbol; later 3 not have length!
				var tmp = EMPTY_VALUES.EMPTY_ARRAY;
				tmp.push(args);
				args = tmp;
			}
			if (pnl1(args)) {
				return this.kv(key, args[0]);
			}
			return this.k(key);
		},

		// fn: function (f, ...ps) {
		// 	if (fnExist(this.k(f))) {
		// 		return this.get()[f](...ps);
		// 	}
		// },
		//优秀API工具哈哈哈哈哈！！！简单包装api必备啊
		/**
		 * 调用底层的方法
		 * f:方法名
		 * 告别"this.方法()"调用,直接this.fn(f,...params);
		 */
		fn: function (f) {
			if (pnl1(arguments) && fnExist(this.k(f))) {
				f = this.k(f);
				var ps = EMPTY_VALUES.EMPTY_ARRAY;
				for (var i = 1; i < arguments.length; i++) {
					ps.push(arguments[i]);
				}
				return f.apply(this.get(), ps);
			}

		},
		//优秀API工具哈哈哈哈哈！！！简单包装api必备啊
		/**
		 * 直接根据上层方法名调用底层方法名相同的方法.
		 * 没有其他作用就是手写简单,也不用管参数传递的事情.
		 * args:Arguments
		 */
		invoke: function (aorf, a) {

			//one parameter,default init
			var f = this.invoke.caller && this.invoke.caller.name;
			var args = f && aorf;
			//two parameter :a exist
			f = a && aorf || f;
			args = (f == aorf && a) || args;
			//two parameter: a not exist
			f = f || aorf;
			args = args || EMPTY_VALUES.EMPTY_ARRAY;

			var ps = EMPTY_VALUES.EMPTY_ARRAY;
			ps[0] = f;
			// if (isFunction(this.invoke.caller)) {
			// 	ps[0] = this.invoke.caller.name;
			// }
			// var args = EMPTY_VALUES.EMPTY_ARRAY;
			// if (p1(arguments)) {
			// 	args = aorf || EMPTY_VALUES.EMPTY_ARRAY;
			// } else if (pnl2(arguments)) {
			// 	ps[0] = aorf;
			// 	args = a || EMPTY_VALUES.EMPTY_ARRAY;
			// }
			for (var i = 0; i < args.length; i++) {
				ps.push(args[i]);
			}

			return this.fn.apply(this, ps);//this.fn的第一个参数必须是函数名。
		},

	};
	/**
	 * 包装接口
	 */
	var wrapper_interface = invoke_interface;

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
	//define empty option
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

	//document selector query dom
	function query(d, selector) {

		//default []
		var elems = d.querySelectorAll(selector);

		if (pnl2(elems)) {
			return domlist.of(elems);
		}

		return dom.of(elems[0]);
	}

	//html element
	function dom(node) {
		notInstanceof(this, dom, 'dom is an class,have to use "new"!');
		this.init(node);
	};

	shallowCopyObj(dom, of_interface);
	shallowCopyObj(dom, extend_interface);
	shallowCopyObj(dom.prototype, extend_interface);

	var dom_prototype_extend = {

		//real constructor
		init: function (n) {
			this.node = n;
		},

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

		k: function (key) {
			if (this.exist()) {
				return this.get()[key];
			}
		},
		kv: function (key, value) {
			if (this.exist()) {
				this.get()[key] = value;
				return this;
			}
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
		},
		clientWidth: function () {
			if (this.exist() && oExist(this.node.clientWidth)) {
				return this.node.clientWidth;
			}
			return 0;
		},
		clientHeight: function () {
			if (this.exist() && oExist(this.node.clientHeight)) {
				return this.node.clientHeight;
			}
			return 0;
		},
		clientTop: function () {
			if (this.exist() && oExist(this.node.clientTop)) {
				return this.node.clientTop;
			}
			return 0;
		},
		clientLeft: function () {
			if (this.exist() && oExist(this.node.clientLeft)) {
				return this.node.clientLeft;
			}
			return 0;
		},
		offsetWidth: function () {
			if (this.exist() && oExist(this.node.offsetWidth)) {
				return this.node.offsetWidth;
			}
			return 0;
		},
		offsetHeight: function () {
			if (this.exist() && oExist(this.node.offsetHeight)) {
				return this.node.offsetHeight;
			}
			return 0;
		},
		offsetTop: function () {
			if (this.exist() && oExist(this.node.offsetTop)) {
				return this.node.offsetTop;
			}
			return 0;
		},
		offsetLeft: function () {
			if (this.exist() && oExist(this.node.offsetLeft)) {
				return this.node.offsetLeft;
			}
			return 0;
		},
		rect: function () {
			if (this.exist() && fnExist(this.node.getBoundingClientRect)) {
				return this.node.getBoundingClientRect();
			}
			return EMPTY_VALUES.EMPTY_OBJECT;
		},
		width: function (w, u = 'px') {
			if (p0(arguments)) {
				return this.clientWidth();
			}
			else if (pnl1(arguments) && isNumber(w)) {
				this.css('width', w + u);
				return this;
			}
		},
		height: function (h, u = 'px') {
			if (p0(arguments)) {
				return this.clientHeight();
			}
			else if (pnl1(arguments) && isNumber(h)) {
				this.css('height', h + u);
				return this;
			}
		},
		full: function (h) {
			if (p0(arguments)) {
				return this.k('outerHTML');
			} else {
				//will changes node,no return!
				this.kv('outerHTML', h);
			}
		}

	};



	//shallowCopyObj(dom.prototype, dom_prototype_extend);
	dom.prototype.extend(dom_prototype_extend);

	//html elements
	function domlist(nodeList) {
		notInstanceof(this, domlist, 'domlist is an class,have to use "new"!');
		this.init(nodeList);
	}


	shallowCopyObj(domlist, of_interface);
	shallowCopyObj(domlist, extend_interface);
	shallowCopyObj(domlist.prototype, extend_interface);

	var domlist_prototype_extend = {
		//real constructor
		init: function (nodeList) {
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
		},

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

	var public_common_interfaces = {
		of_interface: of_interface,
		extend_interface: extend_interface,
		invoke_interface: invoke_interface,
		wrapper_interface: wrapper_interface,
	};

	xy.extend(public_common_interfaces);

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

		ext: ext,
		impl: impl,

		addInterface: function (obj, public_common_interface) {
			if (pnl2(arguments)) {
				return shallowCopyObj(obj, public_common_interface);
			}
		},

		// grantAllCommonInterfaces2Obj: function (obj) {
		// 	if (pnl1(arguments)) {
		// 		for (var public_common_interface in public_common_interfaces) {
		// 			obj = shallowCopyObj(obj, public_common_interface);
		// 		}
		// 		return obj;
		// 	}
		// },

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
				if (oExist(this.node) && fnExist(this.node.addEventListener)) {
					this.node.addEventListener(e, c);
				}
			}
			return this;
		},
		off: function (e, c) {
			if (pnl2(arguments) && isStr(e) && isFunction(c)) {
				if (oExist(this.node) && fnExist(this.node.removeEventListener)) {
					this.node.removeEventListener(e, c);
				}
			}
			return this;
		},
		onEvent: function (e, c) {
			if (pnl2(arguments) && isStr(e) && isFunction(c)) {
				if (oExist(this.node)) {
					this.node['on' + e] = c;
				}
			}
			return this;
		},
		trigger: function (e, d) {
			if (pnl1(arguments) && oExist(this.node) && fnExist(this.node.dispatchEvent)) {
				this.node.dispatchEvent(new CustomEvent(e, { detail: d }));
			}
			return this;
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
			return this;
		}
	};


	dom.prototype.extend(dom_event_fn);


	var domlist_event_fn = {
		on: function (e, c) {
			this.forEach(function (n) {
				n.on(e, c);
			});
			return this;
		},
		onEvent: function (e, c) {
			this.forEach(function (n) {
				n.onEvent(e, c);
			});
			return this;
		},
		off: function (e, c) {
			this.forEach(function (n) {
				n.off(e, c);
			});
			return this;
		},
		trigger: function (e, d) {
			if (pnl1(arguments)) {
				this.forEach(function (n) {
					n.trigger(e, d);
				});
			}
			return this;
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
			return this;
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

	/**
	 * canvas game api
	 * 
	 */


	function canvas(c) {
		// canvas.prototype = new dom(c);
		// //console.log(1, 'canvas.constructor=', canvas.constructor);
		// console.log(1, 'canvas.prototype.constructor=', canvas.prototype.constructor);
		// console.log(1, 'this.__proto__.constructor=', this.__proto__.constructor);
		// console.log(1, 'this.constructor=', this.constructor);
		// console.log(1, 'this.__proto__ == canvas.prototype =', this.__proto__ == canvas.prototype);
		// this.__proto__ = new dom(c);
		// // console.log(2, 'canvas.constructor=', canvas.constructor);
		// console.log(2, 'canvas.prototype.constructor=', canvas.prototype.constructor);
		// console.log(2, 'this.__proto__.constructor=', this.__proto__.constructor);
		// console.log(2, 'this.constructor=', this.constructor);
		// console.log(2, 'this.__proto__ == canvas.prototype =', this.__proto__ == canvas.prototype);
		// this.__proto__.__proto__ = dom.of(c);
		notInstanceof(this, canvas, 'canvas is a constructor,should "new".');
		// console.log("canvas");
		//inherit from dom!
		this.init(c);
	}

	shallowCopyObj(canvas, of_interface);
	shallowCopyObj(canvas, extend_interface);
	shallowCopyObj(canvas.prototype, extend_interface);
	/**
	 * 	Inherit：
	 *  old:canvas.prototype.__proto__ = {}
	 * 	new:canvas.prototype.__proto__ = dom.prototype
	 *	because of dom.prototype.__proto__ is {}
	 *	calling process like this:
	 *		canvas obj(new Canvas) 
	 *		 -> canvas.prototype 
	 *			-> dom.prototype (canvas.prototype.__proto__)
	 *				-> object (dom.prototype.__proto__) 
	 *					-> null (dom.prototype.__proto__.__proto__) 
	 *	dom.prototype should only have common shared variables and methods!
	 *	instanceof ok,inherits ok
	 *  if you do understand meanings of "instanceof"
	 *  and do know meaning of "this" and "prototype",
	 * 	you will understand the following one code.
	 * 	but it cannot use dom's own fields or methods.
	 */
	canvas.prototype.__proto__ = dom.prototype;


	/**
	 * pen is canvas context(2d)
	 * @param {*} p 
	 */
	function pen(p) {
		notInstanceof(this, pen, 'pen is a constructor,should "new".');
		this.init(p);
	}

	shallowCopyObj(pen, of_interface);
	shallowCopyObj(pen, extend_interface);
	// shallowCopyObj(pen.prototype, extend_interface);
	impl(pen,extend_interface);

	pen.prototype.extend(invoke_interface);

	var pen_prototype_extend = {
		init: function (p) {
			// this.p = p;
			this.o(p);
		},

		create: function (c) {
			if (pnl1(arguments)) {
				var createFunctionStr = 'create' + c;

				return this.invoke(createFunctionStr);
			}
		},
		//tool end.
		color: function (c) {

			return this.property('strokeStyle', arguments)
		},
		fillColor: function (c) {

			return this.property('fillStyle', arguments);
		},
		lineRect: function (x = 0, y = 0, w = 0, h = 0) {

			this.invoke('strokeRect', arguments);
			return this;
		},
		fillRect: function (x = 0, y = 0, w = 0, h = 0) {
			// this.fn('fillRect', x, y, w, h);
			//同名才可以调用!
			this.invoke(arguments);
			return this;
		},
		clearRect: function (x = 0, y = 0, w = 0, h = 0) {
			// this.fn('clearRect', x, y, w, h);
			this.invoke(arguments);
			return this;
		},
		text: function (t, x, y, ops = { fill: true }) {
			var maxWidth = ops.maxWidth;
			var fill = ops.fill || true;
			if (fill) {
				if (oExist(maxWidth)) {
					this.fn('fillText', t, x, y, maxWidth);
				} else {
					this.fn('fillText', t, x, y);
				}
			} else {
				if (oExist(maxWidth)) {
					this.fn('strokeText', t, x, y, maxWidth);
				} else {
					this.fn('strokeText', t, x, y);
				}
			}
			return this;
		},
		textSize: function (s) {

			return this.invoke('measureText', arguments);
		},
		lineWidth: function (n) {
			return this.property(arguments);
		},
		/**
		 * ctx.lineCap = "butt";
		 * ctx.lineCap = "round";
		 * ctx.lineCap = "square";
		 * @param {string} c 
		 */
		lineCap: function (c) {
			return this.property(arguments);
		},
		/**
		 * ctx.lineJoin = "bevel";
		 * ctx.lineJoin = "round";
		 * ctx.lineJoin = "miter";
		 */
		lineJoin: function (j) {
			return this.property(arguments);
		},
		miterLimit: function (m) {
			return this.property(arguments);
		},
		lineDash: function (arr) {
			return this.property(arguments);
		},
		lineDashOffset: function (v) {
			return this.property(arguments);
		},
		//文本样式
		font: function (f) {
			return this.property(arguments);
		},
		textAlign: function (t) {
			return this.property(arguments);
		},
		textBaseline: function (t) {
			return this.property(arguments);
		},
		direction: function (t) {
			return this.property(arguments);
		},

		//渐变和图案
		createLinearGradient: function (x0, y0, x1, y1) {
			return this.create('LinearGradient', x0, y0, x1, y1);
		},
		createRadialGradient: function (x0, y0, r0, x1, y1, r1) {
			return this.create('RadialGradient', x0, y0, r0, x1, y1, r1);
		},
		/**
		 * 
		 * @param {Image} image 
		 * @param {string} repetition 
		 */
		createPattern: function (image, repetition) {
			return this.create('Pattern', image, repetition);
		},
		beginPath: function () {
			this.invoke(arguments);
			return this;
		},
		bp: function () {
			this.beginPath();
			return this;
		},
		closePath: function () {
			this.invoke(arguments);
			return this;
		},
		cp: function () {
			this.closePath();
			return this;
		},
		arc: function () {
			this.invoke(arguments);
			return this;
		},
		line: function () {
			this.invoke('stroke', arguments);
			return this;
		},
		fill: function () {
			this.invoke(arguments);
			return this;
		},
		arcTo: function () {
			this.invoke(arguments);
			return this;
		},
		rect: function () {
			this.invoke(arguments);
			return this;
		},
		shadowBlur: function () {
			return this.property(arguments);
		},
		shadowColor: function () {
			return this.property(arguments);
		},
		shadowOffsetX: function () {
			return this.property(arguments);
		},
		shadowOffsetY: function () {
			return this.property(arguments);
		},
		shadowPos: function (x, y) {
			if (pnl2(arguments)) {
				this.shadowOffsetX(x);
				this.shadowOffsetY(y);
				return this;
			}
			return [this.shadowOffsetX(), this.shadowOffsetY()];
		},
		moveTo: function () {
			this.invoke(arguments);
			return this;
		},
		lineTo: function () {
			this.invoke(arguments);
			return this;
		},
		bezierCurveTo: function () {
			this.invoke(arguments);
			return this;
		},
		quadraticCurveTo: function () {
			this.invoke(arguments);
			return this;
		},
		ellipse: function () {
			this.invoke(arguments);
			return this;
		},
		drawFocusIfNeeded: function () {
			this.invoke(arguments);
			return this;
		},
		scrollPathIntoView: function () {
			this.invoke(arguments);
			return this;
		},
		clip: function () {
			this.invoke(arguments);
			return this;
		},
		isPointInPath: function () {
			return this.invoke(arguments);
		},
		isPointInStroke: function () {
			return this.invoke(arguments);
		},
		rotate: function () {
			this.invoke(arguments);
			return this;
		},
		scale: function () {
			this.invoke(arguments);
			return this;
		},
		translate: function () {
			this.invoke(arguments);
			return this;
		},
		transform: function () {
			this.invoke(arguments);
			return this;
		},

		currentTransform: function () {
			return this.property(arguments);
		},
		globalAlpha: function () {
			return this.property(arguments);
		},
		globalCompositeOperation: function () {
			return this.property(arguments);
		},
		canvas: function () {
			return canvas.of(this.property());
		},

		setTransform: function () {
			this.invoke(arguments);
			return this;
		},
		resetTransform: function () {
			this.invoke(arguments);
			return this;
		},
		drawImage: function () {
			this.invoke(arguments);
			return this;
		},
		createImageData: function () {
			return this.invoke(arguments);
		},
		getImageData: function () {
			return this.invoke(arguments);
		},
		putImageData: function () {
			this.invoke(arguments);
			return this;
		},
		save: function () {
			this.invoke(arguments);
			return this;
		},
		restore: function () {
			this.invoke(arguments);
			return this;
		},
		addHitRegion: function () {
			this.invoke(arguments);
			return this;
		},
		removeHitRegion: function () {
			this.invoke(arguments);
			return this;
		},
		clearHitRegions: function () {
			this.invoke(arguments);
			return this;
		},





	};

	pen.prototype.extend(pen_prototype_extend);

	var canvas_static_extend = {
		from: function (s) {
			if (pnl1(s) && strNonEmpty(s)) {
				s = xy.d(s);
				//see dom and domlist get function!
				s = s.get(0);
				return canvas.of(s);
			}
			throw 'first parameter must be string related to canvas element: id,tag name,class and so on.';
		}
	};

	canvas.extend(canvas_static_extend);


	var canvas_prototype_extend = {
		pen: function (type = '2d') {
			if (this.exist() && fnExist(this.k('getContext'))) {
				//Illegal invocation
				// return this.k('getContext')('2d');
				return pen.of(this.get().getContext(type));
			}
		},
		/**
		 * @override
		 * canvas must use width/height attribute!
		 * 
		 * real size on canvas
		 * it influences canvas api!
		 * it's very important!
		 * 
		 */
		width: function (w, u = 'px') {
			if (p0(arguments)) {
				return this.clientWidth();
			}
			else if (pnl1(arguments) && isNumber(w)) {
				this.css('width', w + u);
				this.attr('width', w);
				return this;
			}
		},
		/**
		 * @override
		 * @param {number} h 
		 * @param {string} u 
		 */
		height: function (h, u = 'px') {
			if (p0(arguments)) {
				return this.clientHeight();
			}
			else if (pnl1(arguments) && isNumber(h)) {
				this.css('height', h + u);
				this.attr('height', h);
				return this;
			}
		},


	};

	canvas.prototype.extend(canvas_prototype_extend);




	xy.extend({
		Canvas: canvas,
	});

	/**
	 * end.
	 */






	window.xy = xy;
	return xy;
}));


