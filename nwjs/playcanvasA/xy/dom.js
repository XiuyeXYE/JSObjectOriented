/**
 * My API for dom
 */

;

// var xy = window.xy;

if (!xy) {
	throw "Need xy2.js framework!!!";
}

// var document = window.document || {};

// function hasString(str, subStr) {
//
// return xy.isStr(str) && xy.isStr(subStr) && !x.eq(str.indexOf(subStr), -1);
// }
//
// function hasComma(s) {
// return hasString(s, ',');
// }
//
// function hasGtSign(s) {
// return hasString(s, '>');
// }
//
// function hasWS(s) {
// return hasString(s, ' ');
// }
//
// function hasWellSign(s) {
// return hasString(s, '#');
// }
//
// function hasDotSign(s) {
// return hasString(s, '.');
// }
//
// function bySingleId(node, s) {
// return node.getElementById(s);
// }
//
// function bySingleClass(node, s) {
// return node.getElementsByClassName(s);
// }
//
// function bySingleTagName(node, s) {
// return node.getElementsByTagName(s);
// }
//
// function preSelectorHandler(selector) {
// selector = selector.replace(/^,|,$/, '');
// selector = selector.trim();
// return selector;
// }
//
// function push(elems, node) {
// if (xy.oExist(node)) {
// if (xy.isArray(node)) {
// elems.concat(node);
// } else {
// elems.push(node);
// }
// }
// }

// function query(selector, node = document, elems = []) {
//
// // 预处理
// if (xy.xy.strNonEmpty(selector) || !xy.oExist(node)) {
// return null;
// }
// selector = preSelectorHandler(selector);
// // 分割
//
// if (hasComma(selector)) {
// var subSeletors = selector.split(/\s*,\s*/);
// for (var i = 0; i < xy.len(subSeletors); i++) {
// node = query(subSeletors[i], document, elems);
// push(elems, node);
// }
// } else if (hasGtSign(selector)) {
// var subSeletors = selector.split(/\s*>\s*/);
// for (var i = 0; i < xy.len(subSeletors); i++) {
// node = query(subSeletors[i], node, elems);
// }
// // return node;
// } else if (hasWS(selector)) {
// var subSeletors = selector.split(/\s+/);
// for (var i = 0; i < xy.len(subSeletors); i++) {
// node = query(subSeletors[i], node, elems);
// }
// // return node;
// }
//
// // 求元素
// if (xy.isArray(node)) {
// for (var i = 0; i < xy.len(node); i++) {
// push(elems, query(selector, node[i], elems));
// }
// } else if (hasWellSign(selector)) {
// selector = selector.replace('#', '');
// return bySingleId(node, selector);
// } else if (hasDotSign(selector)) {
// selector = selector.replace('.', '');
// return bySingleClass(node, selector);
// } else {
// return bySingleTagName(node, selector);
// }
//
//
// return elems;
// }

// document selector query dom
// function query(d, selector) {

// //default []
// var elems = d.querySelectorAll(selector);

// if (pnl2(elems)) {
// return domlist.of(elems);
// }

// return dom.of(elems[0]);
// }

// html element
xy.D(
	function Dom(node) {
		xy.notInstanceof(this, Dom, 'Constructor Dom requires "new"!');
		this.events = new xy.HashMap();
		this.o(node);
	},
	// basic
	{// Dom_impl
		// real constructor
		// init: function (n) {
		// 	this.node = n;
		// },
		// d: function (selector) {
		// return query(this.node, selector);
		// },
		// exist: function () {
		// 	return xy.oExist(this.node);
		// },
		isList: function () {
			return false;
		},
		// get: function () {
		// 	return this.node;
		// },

		// k: function (key) {
		// 	if (this.exist()) {
		// 		return this.get()[key];
		// 	}
		// },
		// kv: function (key, value) {
		// 	if (this.exist()) {
		// 		this.get()[key] = value;
		// 		return this;
		// 	}
		// },
		attr: function (k, v) {
			if (arguments.length == 0) {
				throw "less than one parameter!";
			} else if (arguments.length == 1) {
//				if (xy.oExist(this.node) && xy.fnExist(this.node.getAttribute)) {
//					return this.node.getAttribute(k);
//				}
				this.fn("getAttribute",k);
				return xy.EMPTY.STRING;
			} else if (arguments.length >= 2) {
//				if (xy.oExist(this.node) && xy.fnExist(this.node.setAttribute)) {
//					this.node.setAttribute(k, v);
//				}
				this.fn("setAttribute",k,v);
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
				return xy.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
			} else if (arguments.length == 1) {
				var cssExprs = xy
					.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = xy.arrayFilter(cssExprs, function (cssExpr) {
					if (xy.strNonEmpty(cssExpr) && cssExpr.indexOf(k) != -1) {
						return true;
					} else {
						return false;
					}
				});

				if (cssExprs.length >= 1) {
					var vs = xy.EMPTY.ARRAY;
					xy.arrayForEach(cssExprs, function (cssExpr) {
						var cssKV = xy.str2ListBySeparator(cssExpr, /\s*:\s*/);
						if (cssKV.length == 2) {
							vs.push(cssKV[1]);
						}
					});
					if (vs.length == 1) {
						return vs[0];
					} else if (vs.length > 1) {
						return vs;
					}
				}
				return xy.EMPTY.STRING;
			} else if (arguments.length >= 2) {
				var newCssExpr = k + ':' + v;
				var cssExprs = xy
					.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = xy.arrayFilter(cssExprs, function (cssExpr) {
					var cssKV = xy.str2ListBySeparator(cssExpr, /\s*:\s*/);
					if (cssKV.length == 2) {
						return cssKV[0] !== k;
					}
					// <=>clear wrong css
					return false;
				});
				cssExprs.push(newCssExpr);
				return this.attr('style', xy.list2StrWithJoint(cssExprs, ';'));
			}
		},
		cls: function (c, append) {
			append = append || true;
			if (arguments.length == 0) {
				return xy.convertStr2ListByWs(this.attr('class'));
			} else if (xy.isStr(c)) {
				// 如果是空字符串直接返回!
				if (xy.strIsEmpty(c)) {
					return;
				}
				var classList = xy.convertStr2ListByWs(this.attr('class'));
				classList = xy.arrayFilter(classList, function (d) {
					return d !== c;
				});
				if (append) {
					classList.push(c);
				}
				var classStr = xy.convertList2StrWithWs(classList);
				return this.attr('class', classStr);

			} else {
				throw 'First parameter must be string!';
			}
		},
		clientWidth: function () {
			if (this.exist()) {
				return this.k('clientWidth');
			}
			return 0;
		},
		clientHeight: function () {
			if (this.exist()) {
				return this.k('clientHeight');
			}
			return 0;
		},
		clientTop: function () {
			if (this.exist()) {
				return this.k('clientTop');
			}
			return 0;
		},
		clientLeft: function () {
			if (this.exist()) {
				return this.k('clientLeft');
			}
			return 0;
		},
		offsetWidth: function () {
			if (this.exist()) {
				return this.k('offsetWidth');
			}
			return 0;
		},
		offsetHeight: function () {
			if (this.exist()) {
				return this.k('offsetHeight');
			}
			return 0;
		},
		offsetTop: function () {
			if (this.exist()) {
				return this.k('offsetTop');
			}
			return 0;
		},
		offsetLeft: function () {
			if (this.exist()) {
				return this.k('offsetLeft');
			}
			return 0;
		},
		rect: function () {
			return this.fn('getBoundingClientRect');
		},
		width: function (w, u) {
			u = u || 'px';
			if (xy.peq(arguments, 0)) {
				return this.clientWidth();
			} else if (xy.pnl(arguments,1) && xy.isNumber(w)) {
				this.css('width', w + u);
				return this;
			}
		},
		height: function (h, u) {
			u = u || 'px';
			if (xy.peq(arguments, 0)) {
				return this.clientHeight();
			} else if (xy.pnl(arguments,1) && xy.isNumber(h)) {
				this.css('height', h + u);
				return this;
			}
		},
		full: function (h) {
			if (xy.peq(arguments, 0)) {
				return this.k('outerHTML');
			} else {
				// will changes node,no return!
				this.kv('outerHTML', h);
			}
		},
		html: function (h) {
			h = xy.dv(h, xy.EMPTY.STRING);
			if (this.exist()) {
				// bug: 不是所有的属性，都可以用这种方式检验属性啊
				// 因为空字符串''也是false！！！
				// 直接用吧，即可
				// if (!!this.node.innerHTML) {
				if (xy.peq(arguments, 0)) {
//					return this.node.innerHTML;
					return this.k("innerHTML");
				}
//				this.node.innerHTML = h;
				this.kv("innerHTML",h);
				// }
			}

		},
		text: function (t) {
			t = xy.dv(t, xy.EMPTY.STRING);
			if (this.exist()) {
//				if (xy.peq(arguments, 0)) {
//					return this.node.innerText;
//				}
//				this.node.innerText = t;
				this.kv('innerText',t);
			}
		},
		// fix bug:var v and function v conflict!!!
		value: function (v) {
			v = xy.dv(v, xy.EMPTY.STRING);
			if (this.exist()) {
				if (xy.peq(arguments, 0)) {
					return this.attr('value');
				}
				this.attr('value', v);
			}
		},
		parent() {
			return xy.Dom.of(this.k('parentElement'));
		},
		prev() {
			return xy.Dom.of(this.k('previousElementSibling'));
		},
		next() {
			return xy.Dom.of(this.k('nextElementSibling'));
		},
		append() {
			this.invoke("append", xy.arrayMap(xy.arrayLike2Array(arguments), d => d.get()));
			return this;
		},
		appendChild(n) {
			this.fn('appendChild', n.get());
			return this;
		},
		insertBefore(n, e) {
			this.fn('insertBefore', n.get(), e.get());

		},
		//new before old
		//this before old
		before(n) {//n existed node,this not existed in doc
			let p = n.parent();
			if (p.exist()) {
				p.insertBefore(this, n);
			}
		},
		//new before old
		//this before old
		after(n) {//n existed node,this not existed in doc
			let p = n.parent();
			if (p.exist()) {
				let next = n.next();
				if (next.exist()) {
					p.insertBefore(this, next);
				} else {
					p.appendChild(this);
				}
			}
		},
	},
	{
		create: function (tag) { // static dom_impl
			return new this(document.createElement(tag));
		}
	},
	true
);



// xy.impl(xy.Dom,{
// event(e,c){
// this.get().addEventListener(e,c);
// }
// });
xy.I('Dom', xy.std.inst_wrapper_interface);
xy.I('Dom', {//implementations
	registerEvent(e, c) {
		let events = this.events.get(e);
		if (!xy.isArray(events)) {
			events = xy.EMPTY.ARRAY;
			this.events.put(e, events);
		}
		if (xy.eq(events.indexOf(c), -1)) {
			events.push(c);
		}
	},
	unregisterEvent(e, c) {
		let events = this.events.get(e);
		if (!xy.isArray(events)) {
			return;
		}
		let idx = -1;
		if (!xy.eq(idx = events.indexOf(c), -1)) {
			events.splice(idx, 1);
		}
	},
	on() {
		this.invoke('addEventListener', arguments);
		this.registerEvent(arguments[0], arguments[1]);
		return this;
	},
	off() {
		this.invoke('removeEventListener', arguments);
		this.unregisterEvent(arguments[0], arguments[1]);
		return this;
	},
	once() {
		//listener wrap:
		let ps = xy.arrayLike2Array(arguments);
		let eventCallbackListener = ps[1];
		let that = this;
		if (xy.fnExist(eventCallbackListener)) {
			ps[1] = function () {
				//the following code does not run in function in the beginning of time!
				// xdebug(this);
				xy.fy(eventCallbackListener, this, arguments);
				xy.fy(that.off, that, ps);
			};
			// this.invoke('addEventListener', ps);
			xy.fy(this.on, this, ps);
		}
		return this;
	},
	emit(e, d) {
		return this.trigger(e, d);
	},
	trigger(e, d) {
		if (this.exist() && xy.pnl(arguments, 1) && xy.fnExist(this.k('dispatchEvent'))) {
			this.fn('dispatchEvent', new CustomEvent(e, { detail: d }));
		}
		return this;
	},
	//override!
	clone(flag) {
		return xy.Dom.of(this.fn('cloneNode', flag));
	},

});





xy.D(function createDom(tag) {
	return this.Dom.create(tag);
});

xy.D(function ready(c) {
	this.Dom.of(document).on('DOMContentLoaded', c);
});
// xy.cover(function ready(c){
// this.Dom.of(document).event('DOMContentLoaded',c);
// });

xy.D(function byId(id) {

	return this.Dom.of(document.getElementById(id));

});

xy.D(function query(op) {

});

//xy.ready(()=>{
//	xdebug("ready is OK!");
//});
//
//xy("ready",()=>{
//	xdebug("ready is OK!2");
//})



